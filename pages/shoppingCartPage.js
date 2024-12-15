import fs from 'fs'
import MethodRepository from './MethodRepository'
import {facebooklink, footerText, LinkedInlink, shoppingCartIcon, twitterlink} from '../pageObjects/shopPage'
import { cartDescLabel, cartItem, cartQtt, cartQttLabel, checkoutBtn, continueShopBtn, itemName, itemPrice, removeBtn, removeBtnBoltTshirt, shoppCart } from '../pageObjects/ShoppingCartPage'

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

class ShoppingCartPage extends MethodRepository {
    
    constructor (page)
    {
        super(page)
    }
    
    async shopCartCount() 
    {
     return await this.verifyElementText(shoppingCartIcon, testdata.shopCartCount)   
    }

    async verifyQttCartitemAndDescLabelVisible()
    {
        await this.verifyElementVisible(cartQttLabel)
        await this.verifyElementVisible(cartItem)
        await this.verifyElementVisible(cartDescLabel)
    }   

    async cartQttVisible()
    {
        await this.verifyElementVisible(cartQtt)
        return await this.verifyElementText(cartQtt, testdata.cartQtt)
    }

    async itemNameAndPriceVisible()
    {
        await this.verifyElementVisible(itemName)
        await this.verifyElementVisible(itemPrice)
    }

    async verifycontinueShopBtnEnabled()
    {
        return await this.verifyElementEnabled(continueShopBtn, testdata.notEnabledText)
    }
    async verifyremoveBtnEnabled()
    {
        return await this.verifyElementEnabled(removeBtn, testdata.notEnabledText)
    }
    async verifycheckoutBtnEnabled()
    {
        return await this.verifyElementEnabled(checkoutBtn, testdata.notEnabledText)
    }
    async socialLinksVisibleAndFooterText() {
		await this.verifyElementVisible(twitterlink)
		await this.verifyElementVisible(facebooklink)
		await this.verifyElementVisible(LinkedInlink)
		await this.verifyElementVisible(footerText)
	}

    async clickContinueShoppBtn()
    {
        await this.Click(continueShopBtn)
    }

    async clickCheckoutBtn()
    {
        await this.Click(checkoutBtn)
    }

    async clickRemoveBtn()
    {
        await this.Click(removeBtn)
    }
    async RemoveItemsBtnClick()
    {
        await this.Click(removeBtn)
        return await this.Click(removeBtnBoltTshirt)
    }
    async verifyCartPageEmpty()
    {
        return await this.verifyElementText(shoppCart, testdata.cartCountEmpty)
    }
    async 
}export default ShoppingCartPage