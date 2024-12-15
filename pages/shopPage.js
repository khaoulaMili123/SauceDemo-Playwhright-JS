import fs from "fs"
import MethodRepository from "./MethodRepository"
import { Aboutlink, allItemsLink, backpackaddToCart, backpackImg, backpackPrice, backpackTitle, BikeLightaddToCart, BikeLightImg, BikeLightPrice, BikeLightTitle, BoltTShirtaddToCart, BoltTShirtImg, BoltTShirtPrice, BoltTShirtTitle, burgermenuBtn, crossBtn, facebooklink, FleeceJacketaddToCart, FleeceJacketImg, FleeceJacketPrice, FleeceJacketTitle, footerText, inventory_container, landingPageLogo, landingPageTitle, LinkedInlink, LogoutLink, OnesieaddToCart, OnesieImg, OnesiePrice, OnesieTitle, product_sort_container, removebtnBackPack, ResetAppLink, shoppingCartIcon, TShirtRedaddToCart, TShirtRedImg, TShirtRedPrice, TShirtRedTitle, twitterlink } from "../pageObjects/shopPage"
import { removeBtn } from "../pageObjects/itemDetailsPage"


const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

class ShopPage extends MethodRepository {
    constructor (page)
    {
        super(page)
    }
    async verifyLandingPageLogo()
    {
        return await this.verifyElementVisible(landingPageLogo)
    }
    async verifyLandingPageTitle ()
    {
        return await this.verifyElementVisible (landingPageTitle)
    }
    async backpackItem()
    {
        await this.verifyElementVisible(backpackTitle)
        await this.verifyElementVisible(backpackImg)
        await this.verifyElementVisible(backpackPrice)
        await this.verifyElementVisible(backpackaddToCart)

    }
    async addToCartBackPackEnabled()
        {
            return await this.verifyElementEnabled(backpackaddToCart, testdata.notEnabledText)
        }
    
    async backPackItemClick()
    {
        return await this.Click(backpackTitle)
    }
    async addToCartBackPackItem()
    {
        return await this.Click(backpackaddToCart)
    }
    async removebackPackItemClick()
    {
        return await this.Click(removebtnBackPack)
    }
    async BikeLightItem()
    {
        await this.verifyElementVisible(BikeLightTitle)
        await this.verifyElementVisible(BikeLightImg)
        await this.verifyElementVisible(BikeLightPrice)
        await this.verifyElementVisible(BikeLightaddToCart)

    }
    async BoltTShirtItem()
    {
        await this.verifyElementVisible(BoltTShirtTitle)
        await this.verifyElementVisible(BoltTShirtImg)
        await this.verifyElementVisible(BoltTShirtPrice)
        await this.verifyElementVisible(BoltTShirtaddToCart)

    }
    async addtoCartBoltTShirtItem(){
        return await this.Click(BoltTShirtaddToCart)
    } 
    async BoltTShirtItemClick()
    {
        return await this.Click(BoltTShirtImg)
    }
    async FleeceJacketItem()
    {
        await this.verifyElementVisible(FleeceJacketTitle)
        await this.verifyElementVisible(FleeceJacketImg)
        await this.verifyElementVisible(FleeceJacketPrice)
        await this.verifyElementVisible(FleeceJacketaddToCart)

    }
   
    async OnesieItem()
    {
        await this.verifyElementVisible(OnesieTitle)
        await this.verifyElementVisible(OnesieImg)
        await this.verifyElementVisible(OnesiePrice)
        await this.verifyElementVisible(OnesieaddToCart)

    }
    async TShirtRedItem()
    {
        await this.verifyElementVisible(TShirtRedTitle)
        await this.verifyElementVisible(TShirtRedImg)
        await this.verifyElementVisible(TShirtRedPrice)
        await this.verifyElementVisible(TShirtRedaddToCart)

    }
    async verifyBurgerBtn ()
    {
        return await this.verifyElementVisible (burgermenuBtn)
    }
    async burgermenuBtnClick()
    {
        return await this.Click(burgermenuBtn)
    }
    async verifyAllItemsLink()
    {
        return await this.verifyElementVisible(allItemsLink)
    }
    async AllItemsLinkClick()
    {
        return await this.Click(allItemsLink)
    }
    async verifyAboutLink()
    {
        return await this.verifyElementVisible(Aboutlink)
    }
    async crossBtnClick (){
        return await this.Click(crossBtn)
    }
    async AboutClick()
    {
        return await this.Click(Aboutlink)
    }
    async verifyLogoutLink()
    {
        return await this.verifyElementVisible(LogoutLink)
    }
    async LogoutClick()
    {
        return await this.Click(LogoutLink)
    }
    async verifyResetAppLink()
    {
        return await this.verifyElementVisible(ResetAppLink)
    }
    async ResetAppClick()
    {
        return await this.Click(ResetAppLink)
    }
    async shoppingcartLogo()
    {
        return await this.verifyElementVisible(shoppingCartIcon)
    }
    async shoppingcartClick()
    {
        return await this.Click(shoppingCartIcon)
    }
    async verifyshoppCartCount(){
        return await this.verifyElementText(shoppingCartIcon, testdata.shopCartCount)
    }
    async verifyshoppCartCountEmpty(){
        return await this.verifyElementText(shoppingCartIcon, testdata.cartCountEmpty)
    }
    async verifyshoppCartCountAsTwo(){
        return await this.verifyElementText(shoppingCartIcon, testdata.cartCountAsTwo)
    }
    async verifyshoppCartCountAsSix(){
        return await this.verifyElementText(shoppingCartIcon, testdata.cartCountSix)
    }
    async productSortContainerVisible()
    {
        return await this.verifyElementVisible(product_sort_container)
    }
    async inventoryContainerVisible()
    {
        return await this.verifyElementVisible(inventory_container)
    }
    async selectLowToHigh()
    {
        return await this.selectFromDropDown(product_sort_container , testdata.optionLowToHigh)
    }
    async selectHighToLow()
    {
        return await this.selectFromDropDown(product_sort_container , testdata.optionHighToLow)
    }
    async selectZtoA()
    {
        return await this.selectFromDropDown(product_sort_container, testdata.optionZA)
    }
    async footerTextVisible()
    {
        return await this.verifyElementVisible(footerText)
    }
    async socialLinksVisible() {
		await this.verifyElementVisible(twitterlink)
		await this.verifyElementVisible(facebooklink)
		await this.verifyElementVisible(LinkedInlink)
	}

}
export default ShopPage