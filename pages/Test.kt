package interfaces.Common

import android.view.View
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.platform.app.InstrumentationRegistry
import ph.com.bdo.automation_library.extensions.AndroidElement
import ph.com.bdo.automation_library.extensions.ViewMatchers.Companion.withIndex
import org.hamcrest.CoreMatchers.allOf
import org.hamcrest.CoreMatchers.anyOf
import org.hamcrest.CoreMatchers.containsString
import org.hamcrest.Matcher
import ph.com.bdo.automation_library.extensions.Log
import ph.com.bdo.automation_library.extensions.sleep
import ph.com.bdo.pay.R.id.*


fun AndroidElement.safeContains(matcher: Matcher<View>): Boolean {
    return try {
        this.contains(matcher)
    } catch (e: Exception) {
        false
    }
}

class AccountCarousel {
    companion object {
        val lstAccounts
            get() = AndroidElement(
                matcher = anyOf(withId(payment_From_Pager),
                    withId(requestMoneyViaContacts_receiving_Pager),
                    withId(payment_from_Pager),
                    withId(cpQrPaymentFromPager)))

    }

    class selectedAccount() {
        var item: AndroidElement
        var lblNumber: AndroidElement

        init {
            item = AndroidElement(
                matcher = allOf(
                    withId(accounts_selection_view),
                    hasDescendant(allOf(
                        withId(account_selected_icon),
                        withEffectiveVisibility(Visibility.VISIBLE))
                    )
                )
            )

            lblNumber = AndroidElement(
                matcher = allOf(
                    withId(account_selection_description),
                    isDescendantOfA(item.matchers)
                )
            )
        }
    }

    class itmAccount(name: String? = null, number:String?=null) {
        var item: AndroidElement
        var lblName: AndroidElement
        var lblNumber: AndroidElement
        var lblBalanceTitle: AndroidElement
        var lblBalance: AndroidElement

        init {
            var noChilds = lstAccounts.countChild()
            var index = -1

            // 1. Find the correct index first
            for (i in 0 until noChilds) {
                lstAccounts.scrollTo(position = i)
                InstrumentationRegistry.getInstrumentation().waitForIdleSync()
                noChilds = lstAccounts.countChild()
                Log.info("Checking account at index: $i")

                val card = AndroidElement(
                    matcher = withIndex(
                        allOf(isDescendantOfA(lstAccounts.matchers), withId(accounts_selection_view)), i
                    )
                )

                if (name != null && card.safeContains(allOf(withId(account_selection_title), withText(name)))) {
                    Log.info("Account found by name at index: $i")
                    index = i
                    break
                } else if (number != null && card.safeContains(allOf(withId(account_selection_description), withText(number)))) {
                    Log.info("Account found by number at index: $i")
                    index = i
                    break
                }
            }

            if (index == -1) {
                Log.warn("Account not found. Defaulting to last account.")
                index = noChilds - 1
            }

            // 2. Scroll to found index and let UI settle
            lstAccounts.scrollTo(position = index)
            InstrumentationRegistry.getInstrumentation().waitForIdleSync()

            // 3. NOW build item using the correct index
            item = AndroidElement(
                matcher = withIndex(
                    allOf(isDescendantOfA(lstAccounts.matchers), withId(accounts_selection_view)), index
                )
            )

            // 4. Build child elements off the correctly resolved item
            lblName = AndroidElement(
                matcher = allOf(withId(account_selection_title), isDescendantOfA(item.matchers))
            )
            lblNumber = AndroidElement(
                matcher = allOf(withId(account_selection_description), isDescendantOfA(item.matchers))
            )
            lblBalanceTitle = AndroidElement(
                matcher = allOf(withId(account_selection_available), isDescendantOfA(item.matchers))
            )
            lblBalance = AndroidElement(
                matcher = allOf(withId(account_selection_balance), isDescendantOfA(item.matchers))
            )
        }
    }
}