/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker.
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const PACKAGE_VERSION = '2.4.9'
const INTEGRITY_CHECKSUM = '26357c79639bfa20d64c0efca2a87423'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !self.clients) {
    return
  }

  const client = await self.clients.get(clientId)

  if (!client) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: {
          packageVersion: PACKAGE_VERSION,
          checksum: INTEGRITY_CHECKSUM,
        },
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event

  if (request.mode === 'navigate') {
    return
  }

  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  if (activeClientIds.size === 0) {
    return
  }

  const requestId = crypto.randomUUID()

  event.respondWith(
    handleRequest(event, requestId).catch((error) => {
      console.error(
        '[MSW] Failed to mock a "%s" request to "%s": %s',
        request.method,
        request.url,
        error
      )
    })
  )
})

async function handleRequest(event, requestId) {
  const client = await event.target.clients.get(event.clientId)

  if (!client) {
    return passthrough(event.request)
  }

  const clonedRequest = event.request.clone()
  const requestCloneForInspection = event.request.clone()

  sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        url: event.request.url,
        method: event.request.method,
        headers: Object.fromEntries(event.request.headers.entries()),
        cache: event.request.cache,
        mode: event.request.mode,
        credentials: event.request.credentials,
        destination: event.request.destination,
        integrity: event.request.integrity,
        redirect: event.request.redirect,
        referrer: event.request.referrer,
        referrerPolicy: event.request.referrerPolicy,
        body: await requestCloneForInspection.text(),
        keepalive: event.request.keepalive,
      },
    },
    [requestCloneForInspection.body]
  )

  const responsePromise = getResponse(event, client, requestId)

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(resolve, 5000, {
      type: 'MOCK_TIMEOUT',
    })
  })

  const response = await Promise.race([responsePromise, timeoutPromise])

  if (response.type === 'MOCK_TIMEOUT') {
    return passthrough(event.request)
  }

  if (response.type === 'MOCK_NOT_FOUND') {
    return passthrough(clonedRequest)
  }

  const responseInit = {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  }

  responseInit.headers.set('x-powered-by', 'msw')

  if (response.body) {
    const responseWithBody = new Response(response.body, responseInit)
    Object.defineProperty(responseWithBody, IS_MOCKED_RESPONSE, {
      value: true,
      enumerable: true,
    })
    return responseWithBody
  }

  const responseWithoutBody = new Response(null, responseInit)
  Object.defineProperty(responseWithoutBody, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  })

  return responseWithoutBody
}

function getResponse(event, client, requestId) {
  return new Promise((resolve) => {
    function listener(event) {
      if (event.data && event.data.type === 'MOCK_RESPONSE') {
        if (event.data.payload.requestId === requestId) {
          resolve(event.data.payload)
          self.removeEventListener('message', listener)
        }
      }
    }

    self.addEventListener('message', listener)
  })
}

async function passthrough(request) {
  return fetch(request)
}

function sendToClient(client, message, transferables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }

      resolve(event.data)
    }

    client.postMessage(
      message,
      [channel.port2].concat(transferables.filter(Boolean))
    )
  })
}
