/* Scenario 2:
Login as a Standard User to complete the checkout process.

Scenario Description:
This test evaluates the checkout workflow by following a "Happy path," where all functionalities work as expected. 
The Standard User logs in, completes the checkout process, and logs out after verifying all key elements across pages.

Test Steps:
1. Log in to the application as a Standard User.
2. Navigate to the Products/Home page and verify the elements on this page.
3. Sort the products by "Price (high to low)" and confirm they are displayed in the correct order.
4. Add an item to the cart and verify the shopping cart updates to "1" item.
5. Click on the shopping cart icon and verify navigation to the "Your Cart" page.
6. Verify all elements on the "Your Cart" page, including:
   - Quantity and description labels.
   - Product name, quantity, and price.
   - Functionality of "Continue Shopping," "Remove," and "Checkout" buttons.
   - Visibility of footer links and social media icons.
7. Click the "Checkout" button and verify navigation to the "Checkout: Your Information" page.
8. Verify all elements on the "Checkout: Your Information" page, including:
   - Fields for first name, last name, and postal code.
   - Functionality of the "Cancel" and "Continue" buttons.
   - Footer links and social media icons.
9. Complete the fields for first name, last name, and postal code.
10. Click the "Continue" button and verify navigation to the "Checkout: Overview" page.
11. Verify all elements on the "Checkout: Overview" page, including:
    - Quantity, description, product details, and pricing information.
    - Payment and shipping information.
    - Functionality of the "Cancel" and "Finish" buttons.
    - Footer links and social media icons.
12. Click the "Finish" button and verify navigation to the "Checkout: Complete" page.
13. Verify all elements on the "Checkout: Complete" page, including:
    - Order completion message and logo.
    - Pony Express image.
    - Functionality of the "Back Home" button.
    - Footer links and social media icons.
14. Click the "Back Home" button and verify navigation to the Products/Home page.
15. Log out from the application and verify navigation to the Login page, confirming the URL and title.
*/

import {test, expect } from "@playwright/test";
import fs from "fs"
import HomePage from "../pages/homePage"
import CheckoutInformationPage from "../pages/checkoutInformationPage"
import OverviewPage from "../pages/overViewPage"
import CompletePage from "../pages/completePage"
import MethodRepository from "../pages/MethodRepository"
import { baseURL, InformationPageUrl, LandingpageURL, OverviewPageUrl, yourCartUrl } from "../ConfigUtil";
import ShopPage from "../pages/shopPage"; 
import ShoppingCartPage from "../pages/shoppingCartPage";

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

test.describe('Login as a SU to complete the checkout process', () => {
    test('Login To App as a SU and complete the checkout workflow', async({page})=>{ 
        const homePage = new HomePage (page)
        const shopPage = new ShopPage (page)
        const shoppingCartPage = new ShoppingCartPage (page)
        const checkoutInformationPage = new CheckoutInformationPage (page)
        const overviewPage = new OverviewPage (page)
        const completePage = new CompletePage (page)
        const methods = new MethodRepository (page)

        await test.step('Open the App', async () => {
            await homePage.openUrl()
            await homePage.PageLogo()
        })
        await test.step ('Login as a SU', async() =>{
            await homePage.loginAs_SU()
        })
        await test.step('Verify Shopping page', async()=>{
            await shopPage.verifyLandingPageLogo()
            expect(await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step ('Select option"Price(high to low)" and verify the order', async() =>{
            await shopPage.selectHighToLow()
            const priceElements = await page.$$('.inventory_item_price');
             const prices = [];
        
                for (let priceElement of priceElements) {
                    const priceText = await priceElement.textContent();
                    const price = parseFloat(priceText.replace('$', ''));
                    prices.push(price);
                }
                const isSorted = prices.every((price, i, arr) => i === 0 || arr[i - 1] >= price);
                expect(isSorted).toBe(true);
        })
        await test.step ('Add to cart item and check the item count of shopp cart', async()=>{
            await shopPage.addToCartBackPackItem()
            await overviewPage.shoppingCartCount()
        })
        await test.step('Click on shopping cart and verify Your Cart page', async() => {
            await shopPage.shoppingcartClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        })
        await test.step('Verify all the elements on Your Cart page and click on Checkout btn', async()=>{
            await shoppingCartPage.shopCartCount()
            await shoppingCartPage.verifyQttCartitemAndDescLabelVisible()
            await shoppingCartPage.cartQttVisible()
            await shoppingCartPage.itemNameAndPriceVisible()
            await shoppingCartPage.verifycontinueShopBtnEnabled()
            await shoppingCartPage.verifyremoveBtnEnabled()
            await shoppingCartPage.verifycheckoutBtnEnabled()
            await shoppingCartPage.socialLinksVisibleAndFooterText()
            await shoppingCartPage.clickCheckoutBtn()
        })
        await test.step ('Checkout Your Information page and verify all the elements', async()=>{
             expect (await methods.getURl()).toBe(InformationPageUrl)
             await checkoutInformationPage.verifyFirstNameField()
             await checkoutInformationPage.verifyLastNameField()
             await checkoutInformationPage.verifyPostalCodeField()
             await checkoutInformationPage.verifyCancelBtnEnabled()
             await checkoutInformationPage.verifyContinueBtnEnabled()
             await checkoutInformationPage.verifyFooterLinks()
        })
        await test.step('complete the fields', async()=>{
            await checkoutInformationPage.typeFName()
            await checkoutInformationPage.typeLName()
            await checkoutInformationPage.typePostalCode()
        })
        await test.step('Click on the Continue btn, verify that the user is navigated to the Checkout page, and verify all elements on the Overview page', async()=>{
            await checkoutInformationPage.clickContinueBtn()
            expect(await methods.getURl()).toBe(OverviewPageUrl)
            await overviewPage.verifyLogo()
            await overviewPage.shoppingCartCount()
            await overviewPage.qttyAndDescrLabelVisibe()
            await overviewPage.cartQttyVisible()
            await overviewPage.itemNameVisible()
            await overviewPage.itemPriceVisible()
            await overviewPage.payementInfoVisible()
            await overviewPage.shippingInfoVisible()
            await overviewPage.priceTotalInfoVisible()
            await overviewPage.cancelBtnEnabled()
            await overviewPage.finishBtnEnabled()
            await overviewPage.verifyFooterLinks()
        })
        await test.step('Click on the Finish Btn,check whether User is navigated to Complete page and Verify all the elements', async()=>{
            await overviewPage.clickFinishBtn()
            await completePage.verifyLogo()
            await completePage.completeHeaderVisible()
            await completePage.completeTextVisible()
            await completePage.verifyPonyExpressImg()
            await completePage.verifyBackHomeBtnEnabled()
            await completePage.verifyFooterLinks()
        })
        await test.step('Click on the back home btn', async()=>{
            await completePage.backHomeClick()
            expect(await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step('standar user logout from the application',async()=>{
            await shopPage.burgermenuBtnClick()
            await shopPage.LogoutClick()
            await homePage.PageLogo()
            expect(await methods.getURl()).toBe(baseURL)
        })
    })
})