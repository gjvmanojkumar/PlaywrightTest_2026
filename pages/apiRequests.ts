import { request, APIRequestContext, APIResponse, expect, Page } from '@playwright/test'
import { APIData } from '../testData/apiSecrets.json'
import { loginResponse } from '../interface/loginResponse.interface'
import { eventHubLoginResponse } from '../interface/EventHubFormat.interface'
import { orderDetails } from '../interface/orderDetails.interface'
import data from '../testData/sit.config.json'
import { CreateEvent } from '../interface/CreateEvent.interface'
import { AllEvents } from '../interface/AllEvents.interface'


export class APIRequests {
    placeOrderAuthToken: string = ''
    eventsAuthToken: string = ''

    private async getRequest(endpoint: string) {
        const apiContext: APIRequestContext = await request.newContext()
        const apiResponse: APIResponse = await apiContext.get(endpoint, {
            headers: {
                'Content-Type': APIData['content-type'],
                'Authorization': this.placeOrderAuthToken
            }
        })
        return apiResponse
    }

    private async postRequest(endpoint: string, userName: string, password: string) {
        const apiContext: APIRequestContext = await request.newContext()
        const apiResponse: APIResponse = await apiContext.post(endpoint, {
            headers: {
                'Content-Type': APIData['content-type']
            },
            data: {
                'userEmail': userName,
                'userPassword': password
            }
        })
        return apiResponse
    }

    private async deleteRequest(endpoint: string) {
        const apiContext: APIRequestContext = await request.newContext()
        const apiResponse: APIResponse = await apiContext.delete(endpoint)
        return apiResponse
    }

    private async patchRequest(endpoint: string) {
        const apiContext: APIRequestContext = await request.newContext()
        const apiResponse: APIResponse = await apiContext.patch(endpoint)
        return apiResponse
    }

    async authTokenGenerator(url: string, userName: string, password: string) {
        const loginResponse: APIResponse = await this.postRequest(url, userName, password)
        const loginResponseJSON: loginResponse = await loginResponse.json()
        await expect(loginResponse).toBeOK()
        this.placeOrderAuthToken = loginResponseJSON.token
        return this.placeOrderAuthToken
    }

    async getOrderDetails(endpoint: string) {
        const orderDetailsResponse: APIResponse = await this.getRequest(endpoint)
        const orderDetailsResponseJSON: orderDetails = await orderDetailsResponse.json()
        await expect(orderDetailsResponse).toBeOK()
        return orderDetailsResponseJSON
    }
    //--------------------------------------------------------
    async loginAPIRequestEventHub(userName: string, password: string) {
        const apiContext: APIRequestContext = await request.newContext()
        const apiResponse: APIResponse = await apiContext.post(data.apiURLs.eventHubLoginURL, {
            headers: {
                'Content-Type': APIData['content-type']
            },
            data: {
                "email": userName,
                "password": password
            }
        });

        await expect(apiResponse).toBeOK()
        const loginResponseJSON: eventHubLoginResponse = await apiResponse.json()
        this.eventsAuthToken = loginResponseJSON.token
        return this.eventsAuthToken
    }

    async createEvent(eventDayDate: string) {
        const title: string = "Tech Summit 2026"
        // Verify if the Event already exists before creating
        const allEventsResponse: AllEvents = await this.getAllEvents()
        const existingEvent = allEventsResponse.data.find(event => event.title === title)
        if(existingEvent) {
            return existingEvent
        }

        const apiContext: APIRequestContext = await request.newContext()
        const response: APIResponse = await apiContext.post(data.apiURLs.eventHubOrderURL, {
            headers: {
                'Content-Type': APIData['content-type'],
                'Authorization': `Bearer ${this.eventsAuthToken}`
            },
            data: {
                "title": title,
                "description": "A premier technology conference.",
                "category": "Conference",
                "venue": "Bangalore International Centre",
                "city": "Bangalore",
                "eventDate": eventDayDate,
                "price": 1500,
                "totalSeats": 500,
                "imageUrl": "https://example.com/banner.jpg"
            }
        })

        await expect(response).toBeOK()
        const responseJSON: CreateEvent = await response.json()
        return responseJSON
    }

    async getAllEvents() {
        const apiContext: APIRequestContext = await request.newContext()
        const response: APIResponse = await apiContext.get(data.apiURLs.eventHubOrderURL, {
            headers: {
                'Content-Type': APIData['content-type'],
                'Authorization': `Bearer ${this.eventsAuthToken}`
            }
        })

        await expect(response).toBeOK()
        const responseJSON: AllEvents = await response.json()
        return responseJSON
    }
}