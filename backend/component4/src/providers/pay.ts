// =========================
// this service is reponsible for handling payments
// =========================

import { MockAgent, setGlobalDispatcher } from "undici"

const PAYMENT_GATEWAY_URL = "http://localhost:3003"

const ENDPOINTS = {
    "/create-payment": {
        method: "POST",
        mockResult: { status: "SUCCESS" as "SUCCESS" | "FAILURE" },
        args: {} as { merchantId: string, amount: number, cvv: string },
        status: 200
    },
    "/create-merchant": {
        method: "POST",
        mockResult: { status: "SUCCESS" as "SUCCESS" | "FAILURE", merchantId: "xxx" },
        args: {} as { cardNumber: string, expiryDate: string },
        status: 200
    }
}

const mockAgent = new MockAgent()
setGlobalDispatcher(mockAgent)

// this the mock url for our payment gateway
const mockPool = mockAgent.get(PAYMENT_GATEWAY_URL)

const createMockEndpoints = () => {
    for (const [path, meta] of Object.entries(ENDPOINTS)) {
        mockPool.intercept({ path, method: meta.method }).reply(meta.status, meta.mockResult)
    }
}

createMockEndpoints()

type Endpoints = typeof ENDPOINTS

export const paymentProviderAPI = {
    fetch: async <P extends keyof Endpoints>(
        path: P,
        args: Endpoints[P]["args"]
    ): Promise<Endpoints[P]["mockResult"]> => {
        const resp = await fetch(`${PAYMENT_GATEWAY_URL}${path}`, { method: "POST" })
        const data = await resp.json()

        return data
    }
}