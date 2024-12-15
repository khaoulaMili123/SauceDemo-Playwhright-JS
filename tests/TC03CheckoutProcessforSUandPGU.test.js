/* Scenario 3:
Login as a Standard User to verify product functionalities and complete the checkout process as a Performance Glitch User.

Scenario Description:
This scenario evaluates the application's functionality by verifying elements such as buttons, links, and error messages using a Standard User account. The checkout process is then completed by a Performance Glitch User to ensure functionality under potentially delayed conditions.

Test Steps:
**Part 1: Actions with Standard User**
1. Log in as a Standard User and verify the login page.
2. Navigate to the Products/Home page and verify the page elements.
3. Click on a specific product to navigate to its details page and verify the elements on this page.
4. Add the product to the cart and verify that:
   - The "Add to Cart" button changes to "Remove".
   - The shopping cart icon updates to show "1" item.
5. Remove the product from the cart and confirm:
   - The cart is empty.
   - The "Remove" button reverts to "Add to Cart".
6. Navigate back to the Products page using the "Back to Products" button.
7. Click on the shopping cart icon to navigate to the "Your Cart" page and verify the elements.
8. Click the "Continue Shopping" button to return to the Products page.
9. Add a product to the cart, confirm the shopping cart updates to "1" item, and then remove it.
10. Sort the products by "Name (Z to A)" and verify they are displayed in the correct order.
11. Add two products to the cart and confirm the shopping cart updates to "2" items.
12. Navigate to the "Your Cart" page and verify:
    - The quantity (QTY) and description (DESCRIPTION) of the items.
13. Remove both products from the cart and confirm the "Your Cart" page is empty.
14. Add two new products to the cart, update the shopping cart to "2" items, and navigate to the "Your Cart" page.
15. Click the "Checkout" button to navigate to the "Checkout: Your Information" page.
16. Verify error messages for missing first name, last name, and postal code:
    - Enter the first name, verify the error message for the last name.
    - Enter the last name, verify the error message for the postal code.
    - Enter the first name, last name, and postal code to proceed.
17. Navigate to the "Checkout: Overview" page and verify all elements.
18. Click the "Cancel" button and confirm redirection to the Products page.
19. Log out from the Standard User account and verify successful logout.

**Part 2: Actions with Performance Glitch User**
20. Log in as a Performance Glitch User and verify the Products page displays the two items added to the cart by the Standard User.
21. Navigate to the "Your Cart" page and verify the elements.
22. Click the "Checkout" button to navigate to the "Checkout: Your Information" page.
23. Enter the first name, last name, and postal code to proceed.
24. Navigate to the "Checkout: Overview" page and verify all elements.
25. Click the "Finish" button to complete the checkout process and verify redirection to the "Checkout: Complete" page.
26. Click the "Back to Home" button and confirm redirection to the Products page.
27. Log out from the Performance Glitch User account and verify the login page.

*/


import {test, expect } from "@playwright/test"
import fs from "fs"
import HomePage from "../pages/homePage"
import ShopPage from "../pages/shopPage"
import ShoppingCartPage from "../pages/shoppingCartPage"
import OverViewpage from "../pages/overViewPage"
import CompletePage from "../pages/completePage"
import CheckoutInformationPage from "../pages/checkoutInformationPage"
import ItemDetailsPage from "../pages/itemDetailsPage"
import MethodRepository from "../pages/MethodRepository"
import { baseURL, completePageUrl, InformationPageUrl, itemDetailsUrl, LandingpageURL, OverviewPageUrl, yourCartUrl } from "../ConfigUtil"
import { backpackTitle } from "../pageObjects/shopPage"

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))
test.describe('Login as a SUs to select a product item and then complete the checkout process with Performance Glitch User', ()=>{
    test('Standard User and Performance Glitch User Checkout Workflow', async({page})=>{
        const homePage = new HomePage (page)
        const shopPage = new ShopPage (page)
        const shoppingCartPage = new ShoppingCartPage (page)
        const checkoutInformationPage = new CheckoutInformationPage (page)
        const overviewPage = new OverViewpage (page)
        const completePage = new CompletePage (page)
        const itemDetailsPage = new ItemDetailsPage (page)
        const methods = new MethodRepository (page)

        await test.step('Open the URL and check landing page', async()=>{
            await homePage.openUrl()
            await homePage.PageLogo()
            expect (await methods.getURl()).toBe(baseURL)
        })
        await test.step('Login as a Standard user',async()=>{
            await homePage.loginAs_SU()
        })
        await test.step('Verify shoppping page', async()=>{
            await shopPage.verifyLandingPageLogo()
            expect(await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step('Click on a specific product, check whether user is navigated to Details Page and verify all the elements on this page', async()=>{
            await methods.Click(backpackTitle)
            expect(await methods.getURl()).toBe(itemDetailsUrl)
            await itemDetailsPage.verifyLogo()
            await itemDetailsPage.verifyBurgerMenuBtn()
            await itemDetailsPage.verifyShoppingicon()
            await itemDetailsPage.verifyImgVisible()
            await itemDetailsPage.backToProductsBtnEnabled()
            await itemDetailsPage.verifyItemName()
            await itemDetailsPage.verifyItemDescription()
            await itemDetailsPage.verifyItemPrice()
            await itemDetailsPage.socialLinksVisible()
        })
        await test.step('Add a Product to Cart and Verify Cart Updates', async()=>{
            await itemDetailsPage.addToCartBtnClick()
            await itemDetailsPage.verifyRemoveBtnEnabled()
            await itemDetailsPage.verifyShoppingicon()
        }) 
        await test.step('Click on Remove btn on Product Details page and verify shopping cart is empty', async()=>{
            await itemDetailsPage.removebtnClick()
            await itemDetailsPage.verifyShoppingiconCountEmpty()
        }) 
        await test.step('Navigate Back to Products Page from Product Details', async()=>{
            await itemDetailsPage.backToProductBtnClick()
            expect(await methods.getURl()).toBe(LandingpageURL)
        }) 
        await test.step('Click on shopping cart link to navigate to your cart page', async()=>{
            await shopPage.shoppingcartClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        }) 
        await test.step('Click on "continue shopping" btn to go back to Products page', async()=>{
            await shoppingCartPage.clickContinueShoppBtn()
            expect(await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step('Add a product to the cart and verify the shopping cart updates to "1"', async()=>{
            await shopPage.addToCartBackPackItem()
            await shopPage.verifyshoppCartCount()
        })
        await test.step('remove the item,confirm the cart is empty, and the Remove btn for the product reverts to "Add to Cart"', async()=>{
            await shopPage.removebackPackItemClick()
            await shopPage.verifyshoppCartCountEmpty()
            await shopPage.addToCartBackPackEnabled()

        })
        await test.step('Sort products by Name (Z to A) and confirm they are displayed in the correct order', async()=>{
            await shopPage.selectZtoA()
            const productTitles = await page.locator('.inventory_item_name').allInnerTexts()
            const sortedTitles = [...productTitles].sort((a, b) => b.localeCompare(a))
            expect(productTitles).toEqual(sortedTitles)
        })
        await test.step('Add two products to the cart and confirm the shopping cart updates to "2" items', async()=>{
            await shopPage.addToCartBackPackItem()
            await shopPage.addtoCartBoltTShirtItem()
            await shopPage.verifyshoppCartCountAsTwo()
        })
        await test.step('Click the Shopping Cart Icon,Verify the user is redirected to the Your Cart page, showing the QTY and DESCRIPTION of the items.', async()=>{
            await shopPage.shoppingcartClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        })
        await test.step('Remove both items from the cart and confirm the Your Cart page is empty', async()=>{
            await shoppingCartPage.RemoveItemsBtnClick()
            await shoppingCartPage.verifyCartPageEmpty()
        })
        await test.step('Click the Continue Shopping button and verify the user is redirected to the Products page.', async()=>{
            await shoppingCartPage.clickContinueShoppBtn()
            expect(await methods.getURl()).toBe(LandingpageURL)      
        })
        await test.step('Add two new products to the cart, updating the cart to "2" items,click the Shopping Cart Icon and verify navigation to the Your Cart page', async()=>{
            await shopPage.addToCartBackPackItem()
            await shopPage.addtoCartBoltTShirtItem()
            await shopPage.verifyshoppCartCountAsTwo()
            await shopPage.shoppingcartClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        })
        await test.step('Click the Checkout button again to return to the Checkout: Your Information page', async()=>{
            await shoppingCartPage.clickCheckoutBtn()
            expect(await methods.getURl()).toBe(InformationPageUrl)
        })
        await test.step('Verify Error Messages for Missing First Name, Last Name, and Postal Code in the Checkout Workflow', async()=>{
            await checkoutInformationPage.clickContinueBtn()
            await checkoutInformationPage.verifyErrorMsg()
            await checkoutInformationPage.verifyErrorMsgFN()
            await checkoutInformationPage.typeFName()
            await checkoutInformationPage.clickContinueBtn()
            await checkoutInformationPage.verifyErrorMsg()
            await checkoutInformationPage.verifyErrorMsgLN()
            await checkoutInformationPage.typeFName()
            await checkoutInformationPage.typeLName()
            await checkoutInformationPage.clickContinueBtn()
            await checkoutInformationPage.verifyErrorMsg()
            await checkoutInformationPage.verifyErrorMsgPC()

        })
        await test.step('Enter the FN,LN,PC,click the Continue btn and navigate to the Checkout: Overview page.', async()=>{
            await checkoutInformationPage.typeFName()
            await checkoutInformationPage.typeLName()
            await checkoutInformationPage.typePostalCode()
            await checkoutInformationPage.clickContinueBtn()
            expect(await methods.getURl()).toBe(OverviewPageUrl)
        }) 
        await test.step('Click the Cancel button and confirm redirection to the Products page', async()=>{
            await overviewPage.cancelBtnClick()
            expect(await methods.getURl()).toBe(LandingpageURL)
        }) 
        await test.step('Log out from the Standard User account and Verify successful logout by confirming the Login Page URL', async()=>{
            await shopPage.burgermenuBtnClick()
            await shopPage.LogoutClick()
            expect(await methods.getURl()).toBe(baseURL)
        })
        await test.step('Login to the application as performance_glitch_user and verify the Products page displays the two items added to the cart by the Standard User.', async()=>{
            await homePage.loginAs_PG_user()
            expect(await methods.getURl()).toBe(LandingpageURL)
            await shopPage.verifyshoppCartCountAsTwo()
        })
        await test.step('Click the Shopping Cart Icon and verify navigation to the Your Cart page', async()=>{
            await shopPage.shoppingcartClick()
            expect(await methods.getURl()).toBe(yourCartUrl)
        })
        await test.step('Verify Navigation to Checkout: Your Information Page and Successful Entry of Customer Details', async()=>{
            await shoppingCartPage.clickCheckoutBtn()
            expect(await methods.getURl()).toBe(InformationPageUrl) 
            await checkoutInformationPage.typeFName()   
            await checkoutInformationPage.typeLName()
            await checkoutInformationPage.typePostalCode()
        })
        await test.step('Click the Continue button and navigate to the Checkout: Overview page', async()=>{
            await checkoutInformationPage.clickContinueBtn()
            expect (await methods.getURl()).toBe(OverviewPageUrl)
        })
        await test.step('Click the Finish btn and verify navigation to the Checkout: Complete page', async()=>{
            await overviewPage.clickFinishBtn()
            expect(await methods.getURl()).toBe(completePageUrl)
        })
        await test.step('Click the Back to Home btn and verify the user is redirected to the Products page.', async()=>{
            await completePage.backHomeClick()
            expect(await methods.getURl()).toBe(LandingpageURL)
        })
        await test.step('Logout from the application and verify the Login Page URL after logout', async()=>{
            await shopPage.burgermenuBtnClick()
            await shopPage.LogoutClick()
            expect(await methods.getURl()).toBe(baseURL)
        })

    })
})

