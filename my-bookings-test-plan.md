# My Bookings Page Test Plan

## Application Overview

Comprehensive test plan for the My Bookings page in EventHub, covering user authentication, booking display, detailed view access, cancellation workflows, and refund eligibility checks. Tests ensure robust functionality for viewing and managing event bookings.

## Test Scenarios

### 1. Authentication and Page Access

**Seed:** `tests/seed-login.spec.ts`

#### 1.1. Verify My Bookings page loads after login

**File:** `tests/auth/my-bookings-access.spec.ts`

**Steps:**
  1. Navigate to login page and enter credentials (bruceWayne1@gmail.com / BruceWayne123@)
    - expect: User is logged in with valid credentials
  2. Click Sign In button
    - expect: Login successful, redirected to home page
  3. Verify navigation bar contains My Bookings link
    - expect: My Bookings link is visible in navigation
  4. Click My Bookings link
    - expect: Page title is 'EventHub — Discover & Book Events'
  5. Verify page loads successfully
    - expect: URL is /bookings
    - expect: Page displays 'My Bookings' heading
    - expect: Clear all bookings button is present

#### 1.2. Verify unauthorized access is blocked

**File:** `tests/auth/unauthorized-access.spec.ts`

**Steps:**
  1. Attempt direct navigation to /bookings URL
    - expect: User is not logged in
  2. Verify access is restricted
    - expect: Redirected to login page
    - expect: Access denied message or login prompt appears

#### 1.3. Verify logout from My Bookings page

**File:** `tests/auth/logout-functionality.spec.ts`

**Steps:**
  1. Click Logout button in navigation
    - expect: User is on My Bookings page
  2. Verify logout successful
    - expect: Redirected to login page
    - expect: Session ended

#### 1.4. Verify bookings are displayed correctly

**File:** `tests/bookings-display/display-bookings.spec.ts`

**Steps:**
  1. Ensure user has existing bookings
    - expect: At least one booking exists
  2. Check booking card structure
    - expect: Each booking shows reference ID (T-XXXXXX)
    - expect: Status (confirmed/cancelled)
    - expect: Booking ID (#XXX)
    - expect: Event title
    - expect: Date, tickets, location, booked date
    - expect: Total price
    - expect: View Details and Cancel Booking buttons
  3. Verify booking order (latest at top)
    - expect: Bookings are sorted by most recent first
  4. Check price formatting
    - expect: Prices are displayed in $ format

#### 1.5. Verify empty bookings state

**File:** `tests/bookings-display/empty-bookings.spec.ts`

**Steps:**
  1. Clear all bookings or use account with no bookings
    - expect: User has no bookings
  2. Verify empty bookings handling
    - expect: Page shows appropriate empty state message
    - expect: No booking cards displayed

#### 1.6. Verify Clear all bookings functionality

**File:** `tests/bookings-display/clear-bookings.spec.ts`

**Steps:**
  1. Click Clear all bookings button
    - expect: Bookings exist on page
  2. Verify dialog prompt
    - expect: Confirmation dialog appears
  3. Confirm and verify bookings cleared
    - expect: All bookings removed from page
    - expect: Empty state shown

#### 1.7. Verify View Details functionality

**File:** `tests/booking-details/view-details.spec.ts`

**Steps:**
  1. Click View Details button on a booking card
    - expect: Booking exists
  2. Verify navigation to details page
    - expect: URL changes to /bookings/{id}
    - expect: Breadcrumb shows My Bookings / Reference ID
    - expect: Booking reference and status displayed
    - expect: Cancel Booking button present

#### 1.8. Verify Event Details section

**File:** `tests/booking-details/event-details-section.spec.ts`

**Steps:**
  1. Check Event Details section
    - expect: On booking details page
  2. Verify all event information is present and accurate
    - expect: Event name matches booking
    - expect: Category displayed
    - expect: Date in full format
    - expect: Venue and city shown

#### 1.9. Verify Customer Details section

**File:** `tests/booking-details/customer-details-section.spec.ts`

**Steps:**
  1. Check Customer Details section
    - expect: On booking details page
  2. Verify customer information accuracy
    - expect: Name, email, phone match booking data

#### 1.10. Verify Payment Summary section

**File:** `tests/booking-details/payment-summary-section.spec.ts`

**Steps:**
  1. Check Payment Summary section
    - expect: On booking details page
  2. Verify payment details
    - expect: Number of tickets
    - expect: Price per ticket
    - expect: Total paid amount

#### 1.11. Verify Booking Information section

**File:** `tests/booking-details/booking-info-section.spec.ts`

**Steps:**
  1. Check Booking Information section
    - expect: On booking details page
  2. Verify booking metadata
    - expect: Booked on date
    - expect: Booking ID matches card

#### 1.12. Verify back to My Bookings navigation

**File:** `tests/booking-details/back-navigation.spec.ts`

**Steps:**
  1. Click '← Back to My Bookings' link
    - expect: On booking details page
  2. Verify navigation back to list
    - expect: Redirected to /bookings
    - expect: Bookings list displayed

#### 1.13. Verify canceling a confirmed booking

**File:** `tests/cancel-booking/cancel-confirmed-booking.spec.ts`

**Steps:**
  1. Click Cancel Booking button on details page
    - expect: Confirmed booking exists
  2. Verify cancel confirmation prompt
    - expect: Confirmation dialog appears
  3. Confirm cancellation and verify status update
    - expect: Booking status changes to cancelled
    - expect: Cancel button disabled or removed

#### 1.14. Verify canceling already cancelled booking

**File:** `tests/cancel-booking/cancel-already-cancelled.spec.ts`

**Steps:**
  1. Attempt to cancel already cancelled booking
    - expect: Cancelled booking exists
  2. Verify cancellation prevented
    - expect: Operation blocked
    - expect: Error message displayed

#### 1.15. Verify refund eligibility check

**File:** `tests/refund/refund-eligibility-check.spec.ts`

**Steps:**
  1. Click 'Check eligibility for refund?' button
    - expect: On booking details page
  2. Verify refund check functionality
    - expect: Refund status displayed (eligible/not eligible)
    - expect: Reason provided if not eligible

#### 1.16. Verify refund process for eligible booking

**File:** `tests/refund/refund-eligible-booking.spec.ts`

**Steps:**
  1. Initiate refund process
    - expect: Booking is refund eligible
  2. Verify refund completion
    - expect: Refund processed successfully
    - expect: Confirmation message shown
    - expect: Booking status updated

#### 1.17. Verify refund blocked for ineligible booking

**File:** `tests/refund/refund-ineligible-booking.spec.ts`

**Steps:**
  1. Attempt refund on ineligible booking
    - expect: Booking is not refund eligible
  2. Verify refund prevention
    - expect: Refund blocked
    - expect: Error message explains ineligibility
