import { ref } from "node:process"

export const loginPageLocators = {
    userNameLoc: 'you@email.com',
    passwordLoc: 'Password',
    signInBtnLoc: '#login-btn',
    logoutBtnLoc: '#logout-btn'
}

export const registerLocators = {
    userNameLoc: 'you@email.com',
    passwordLoc: '#register-password',
    confirmPwdLoc: '//div/label[text()="Confirm Password"]/following-sibling::input',
    registerBtnLoc: '#login-btn'
}

export const eventDetailsPageLoc = {
    lblAdminLoc: 'Admin',
    titleInputLoc: '#event-title-input',
    lblDescription: '#admin-event-form textarea',
    cityLoc: 'City',
    venueLoc: 'Venue',
    priceLoc: 'Price ($)',
    eventDateTimeLoc: 'Event Date & Time',
    totalSeatsLoc: 'Total Seats',
    btnAdd: '#add-event-btn',
    eventSuccessAlert: '//p[contains(text(), "Event created!")]'
}

export const eventsPageLoc = {
    eventsPageNavLoc: '#nav-events',
    eventCardLoc: '[data-testid="event-card"]',
    seatsAvailableLoc: 'span:has-text(" seats available")'
}

export const bookingPageLoc = {
    eventTitleLoc: 'div h1',
    eventDescription: 'div h2+p',
    venueDetails: 'p:text("Venue")+p[class*="text-sm"]',
    cityInfo: 'p:text("City")+p[class*="text-sm"]',
    priceDetails: 'p:text("Price per ticket")+p',
    seatsCount: 'p:text("Available")+p',
    fullNameLoc: 'Full Name',
    emailLoc: '#customer-email',
    mobileNumLoc: '+91 98765 43210',
    ticketCountLoc: '#ticket-count',
    btnConfirmBooking: '#confirm-booking',
    bookingRefID: 'span[class*="booking-ref"]',
    bookingsPageNav: '#nav-bookings',
    refundBtn: '#check-refund-btn',
    refundSpinner: '#refund-spinner',
    refundResult: '#refund-result',
    btnAddSeats: '//button[text()="+"]'
}