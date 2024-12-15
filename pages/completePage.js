import fs from "fs"
import MethodRepository from "./MethodRepository"
import { backHomeBtn, burgerbtn, completeHeader, completePageLogo, completeText, logoutLink, ponyImg } from "../pageObjects/completePage"
import { facebooklink, footerText, LinkedInlink, twitterlink } from "../pageObjects/shopPage"

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

class CompletePage extends MethodRepository{
    constructor (page)
    {
        super(page)
    }
    async verifyLogo()
    {
        return await this.verifyElementVisible(completePageLogo)
    }
    async completeHeaderVisible()
    {
        await this.verifyElementVisible(completeHeader)
        //return await this.verifyElementText(completeHeader, testdata.completeHeaderText)
    }
    async completeTextVisible()
    {
        await this.verifyElementVisible(completeText)
        return await this.verifyElementText(completeText, testdata.completeOrderText)
    }
    async verifyPonyExpressImg()
    {
        return await this.verifyElementVisible(ponyImg)
    }
    async verifyBackHomeBtnEnabled()
    {
        return await this.verifyElementEnabled(backHomeBtn, testdata.notEnabledText)
    }
    async backHomeClick(){
        return await this.Click(backHomeBtn)
    }
    async verifyFooterLinks()
    {
        await this.verifyElementVisible(facebooklink)
        await this.verifyElementVisible(twitterlink)
        await this.verifyElementVisible(LinkedInlink)
        await this.verifyElementVisible(footerText)

    }
    async logout()
    {
        await this.Click(burgerbtn)
        await this.Click(logoutLink)
    }
}
export default CompletePage