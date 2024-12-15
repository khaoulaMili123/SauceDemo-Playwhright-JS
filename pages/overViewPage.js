import fs from "fs"
import MethodRepository from "./MethodRepository"
import { backPackItemPrice, cardInfo, deliveryMsg, finishBtn, itemPrice, overviewPageLogo, paymentInfo, priceInfo, shippingInfo, subtotalLbale, taxLabel, totalLabel } from "../pageObjects/overviewPage"
import { backpackPrice, backpackTitle, facebooklink, footerText, LinkedInlink, shoppingCartIcon, twitterlink } from "../pageObjects/shopPage"
import { cartDescLabel, cartQtt, cartQttLabel } from "../pageObjects/ShoppingCartPage"
import { cancelBtn } from "../pageObjects/checkoutInformationPage"

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

class OverViewpage extends MethodRepository {
    constructor(page)
    {
        super(page)
    }
    async verifyLogo()
    {
        return await this.verifyElementVisible(overviewPageLogo)
    }
    async shoppingCartCount()
    {
        return await this.verifyElementText(shoppingCartIcon, testdata.shopCartCount)
    }
    async qttyAndDescrLabelVisibe()
    {
        await this.verifyElementVisible(cartQttLabel)
        return await this.verifyElementVisible(cartDescLabel)
    }
    async cartQttyVisible()
    {
        await this.verifyElementVisible(cartQtt)
        return await this.verifyElementText(cartQtt, testdata.cartQtt)
    }
    async itemNameVisible()
    {
        return await this.verifyElementVisible(backpackTitle)
    }
    async itemPriceVisible()
    {
        return await this.verifyElementVisible(backPackItemPrice)
    }
    async payementInfoVisible()
    {
        await this.verifyElementVisible(paymentInfo)
        await this.verifyElementVisible(cardInfo)
    }
    async shippingInfoVisible()
    {
        await this.verifyElementVisible(shippingInfo)
        await this.verifyElementVisible(deliveryMsg)
    }
    async priceTotalInfoVisible()
    {
        await this.verifyElementVisible(priceInfo)
        await this.verifyElementVisible(subtotalLbale)
        await this.verifyElementVisible(taxLabel)
        await this.verifyElementVisible(totalLabel)
    }
    async cancelBtnEnabled()
    {
        return await this.verifyElementEnabled(cancelBtn, testdata.notEnabledText)
    }
    async cancelBtnClick()
    {
        return await this.Click(cancelBtn)
    }
    async finishBtnEnabled()
    {
        return await this.verifyElementEnabled(finishBtn, testdata.notEnabledText)
    }
    async clickFinishBtn()
    {
        return await this.Click(finishBtn)
    }
    async verifyFooterLinks()
    {
        await this.verifyElementVisible(facebooklink)
        await this.verifyElementVisible(twitterlink)
        await this.verifyElementVisible(LinkedInlink)
        await this.verifyElementVisible(footerText)

    }
} 
export default OverViewpage