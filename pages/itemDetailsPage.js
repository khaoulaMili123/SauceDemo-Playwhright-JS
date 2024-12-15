import fs from "fs"
import MethodRepository from "./MethodRepository"
import { LoginPagelogo } from "../pageObjects/homePage"
import { burgermenuBtn, facebooklink, footerText, LinkedInlink, shoppingCartIcon, twitterlink } from "../pageObjects/shopPage"
import { addToCartBtn, backToProductBtn, detailsPageLogo, image, itemDescription, itemName, itemPrice, removeBtn } from "../pageObjects/itemDetailsPage"


const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

class ItemDetailsPage extends MethodRepository {
    constructor(page){
        super(page)
    }
    async verifyLogo(){
        return await this.verifyElementVisible(detailsPageLogo)
    }
    async verifyBurgerMenuBtn(){
        return await this.verifyElementVisible(burgermenuBtn) 
    }
    async verifyShoppingicon(){
        return await this.verifyElementVisible(shoppingCartIcon)
    }
    async verifyImgVisible(){
        return await this.verifyElementVisible(image)
    }
    async backToProductsBtnEnabled(){
        return await this.verifyElementEnabled(backToProductBtn,testdata.notEnabledText)
    }
    async backToProductBtnClick(){
        return await this.Click(backToProductBtn)
    }
    async verifyItemName(){
        return await this.verifyElementVisible(itemName)
    }
    async verifyItemDescription(){
        return await this.verifyElementVisible(itemDescription)
    }
    async verifyItemPrice (){
        return await this.verifyElementVisible(itemPrice)
    }
    async addToCartBtnClick(){
        await this.verifyElementEnabled(addToCartBtn, testdata.notEnabledText)
        return await this.Click(addToCartBtn)
    }
    async verifyRemoveBtnEnabled(){
        await this.verifyElementEnabled(removeBtn,testdata.notEnabledText)
    }
    async removebtnClick(){
        await this.verifyElementEnabled(removeBtn, testdata.notEnabledText)
        return await this.Click(removeBtn)
    }
    async vrifyShoppingIconCount(){
        return await this.verifyElementText(shoppingCartIcon, testdata.shopCartCount)
    }
    async verifyShoppingiconCountEmpty() {
		return await this.verifyElementText(shoppingCartIcon, testdata.cartCountEmpty
		)
	}
    async ShoppingIconClick(){
        return await this.Click(shoppingCartIcon)
    }
    async socialLinksVisible() {
		await this.verifyElementVisible(twitterlink)
		await this.verifyElementVisible(facebooklink)
		await this.verifyElementVisible(LinkedInlink)
        await this.verifyElementVisible(footerText)
	}

} export default ItemDetailsPage