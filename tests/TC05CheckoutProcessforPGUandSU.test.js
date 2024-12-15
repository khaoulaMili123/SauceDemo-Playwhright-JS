/*Scenario 5:
Login as a locked_out_user to verify an error message, then login as a performance_glitch_user to add a product to the cart and log out. Finally, complete the checkout workflow as a standard_user.

Scenario Description:
This scenario tests the application's functionality with different user types and workflows. First, a "locked_out_user" attempts to log in, and the system displays an error message indicating the account is locked. Next, the "performance_glitch_user" logs in, adds a product to the cart, and logs out. Finally, a "standard_user" logs in, verifies the cart retains the product added earlier by the performance glitch user, and successfully completes the checkout workflow.

Test Steps:
1.Login as a Locked Out User:
 -Open the application and verify the logo and base URL.
 -Attempt to log in as a "locked_out_user" and validate the error message: "Sorry, this user has been locked out."

 2.Login as a Performance Glitch User:
 -Log in using the credentials of a "performance_glitch_user."
 -Verify navigation to the products page and check the page title and URL.
 -Add a product to the cart and confirm the cart updates to display "1" item.
 -Navigate to the "Your Cart" page, then proceed to the "Checkout: Your Information" page.
 -Fill in customer details (First Name, Last Name, and Postal Code), then proceed to the "Checkout: Overview" page.
 -Log out from the application using the burger menu, returning to the login page.

3.Login as a Standard User:
 -Log in as a "standard_user" and verify navigation to the products page.
 -Validate the shopping cart retains the item added earlier by the performance glitch user.
 -Navigate to the "Your Cart" page, proceed to the "Checkout: Your Information" page, and enter customer details.
 -Complete the checkout process by confirming the order on the "Checkout: Overview" page.
 -Verify navigation to the "Checkout: Complete" page.
 -Log out from the application and confirm redirection to the login page.*/

import {test, expect } from "@playwright/test"
import fs from "fs"
import HomePage from "../pages/homePage"
import { baseURL, completePageUrl, InformationPageUrl, itemDetailsUrl, LandingpageURL, OverviewPageUrl, yourCartUrl } from "../ConfigUtil"
import ShopPage from "../pages/shopPage"
import ShoppingCartPage from "../pages/shoppingCartPage"
import CheckoutInformationPage from "../pages/checkoutInformationPage"
import OverViewpage from "../pages/overViewPage"
import CompletePage from "../pages/completePage"
import ItemDetailsPage from "../pages/itemDetailsPage"
import MethodRepository from "../pages/MethodRepository"

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))
test.describe.parallel('Login as a LO-User and PG-User and complete the checkout workflow with SU', ()=>{
    test('Login as a Locked Out User', async({page})=>{
        const homePage = new HomePage (page)
        const methods = new MethodRepository(page)
        await test.step('Open the URL and check logo',async()=>{
            await homePage.openUrl()
            await homePage.PageLogo()
            expect(await methods.getURl()).toBe(baseURL)
        })
        await test.step('Login as a LO User', async ()=>{
            await homePage.loginAs_LO_user()
        })
        await test.step('Verify error msg on the login page', async()=>{
            await homePage.verifyErrorMsg()
            await homePage.VerifyLO_UserErrorMsg()
            expect(await methods.getURl()).toBe(baseURL)
        })
    })
    test('Login as a PUG user', async({page})=>{
        const homePage = new HomePage (page)
        const shopPage = new ShopPage (page)
        const shoppingCartPage = new ShoppingCartPage (page)
        const checkoutInformationPage = new CheckoutInformationPage (page)
        const overviewPage = new OverViewpage (page)
        const completePage = new CompletePage (page)
        const itemDetailsPage = new ItemDetailsPage (page)
        const methods = new MethodRepository (page)
        await test.step('Open the URL and check logo', async()=>{
            await homePage.openUrl()
            await homePage.PageLogo()
            expect(await methods.getURl()).toBe(baseURL)
        })
        await test.step('Login as a PG User and Verify landing page url', async()=>{
            await homePage.loginAs_PG_user()
            await shopPage.verifyLandingPageLogo()
            expect (await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step('Click on Add to Cart btn on Product Details page and verify shopping cart is updated to "1" item', async()=>{
            await shopPage.backPackItemClick()
            expect(await itemDetailsPage.getURl()).toBe(itemDetailsUrl)
            await itemDetailsPage.addToCartBtnClick()
            await itemDetailsPage.vrifyShoppingIconCount()
        })
        await test.step('Click on shopping cart and navigate to your cart page', async()=>{
            await itemDetailsPage.ShoppingIconClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        })
        await test.step('Click on "checkout btn" and navigates to Checkout:Your Information page', async()=>{
            await shoppingCartPage.clickCheckoutBtn()
            expect(await methods.getURl()).toBe(InformationPageUrl)
        })
        await test.step('User types in the FN,LN,PC and click continue btn to navigate to Checkout:Overview page', async()=>{
            await checkoutInformationPage.typeFName()
            await checkoutInformationPage.typeLName()
            await checkoutInformationPage.typePostalCode()
            await checkoutInformationPage.clickContinueBtn()
            expect(await methods.getURl()).toBe(OverviewPageUrl)
        })
        await test.step('Logout from the application and navigate back to login page', async()=>{
            await overviewPage.cancelBtnClick()
            await shopPage.burgermenuBtnClick()
            await shopPage.LogoutClick()
            expect(await methods.getURl()).toBe(baseURL)
        })
        await test.step('Login as a Standard user and verify Products page', async()=>{
            await homePage.loginAs_SU()
            expect(await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step('Verify shopping cart have "1" item added by the Problem user earlier', async()=>{
            await shopPage.verifyshoppCartCount()    
        })
        await test.step('Standard user clicks on shopping cart and navigates to your cart page', async()=>{
            await shopPage.shoppingcartClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        })
        await test.step('Click on checkout btn and navigates to Checkout:Your Information page',async()=>{
            await shoppingCartPage.clickCheckoutBtn()
            expect(await methods.getURl()).toBe(InformationPageUrl)
        })
        await test.step('Fill in firstname, last name and postal code and click continue',async()=>{
            await checkoutInformationPage.typeFName()
            await checkoutInformationPage.typeLName()
            await checkoutInformationPage.typePostalCode()
            await checkoutInformationPage.clickContinueBtn()
        })
        await test.step('Verify overview page and click on “Finish button”',async()=>{
            expect(await methods.getURl()).toBe(OverviewPageUrl)
            await overviewPage.clickFinishBtn()
        })
        await test.step('User is navigated to Checkout: Complete Page, Logout from the application from Checkout: Complete Page and Verify the login page ',async()=>{
            expect(await methods.getURl()).toBe(completePageUrl)
            await completePage.logout()
            expect(await methods.getURl()).toBe(baseURL)
            
        })
    })

})