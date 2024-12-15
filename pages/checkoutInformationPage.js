import fs, { read } from "fs"
import MethodRepository from "./MethodRepository"
import { burgerbtn, cancelBtn, continueBtn, errormsg, firstName, lastName, logoutbtn, postalCode } from "../pageObjects/checkoutInformationPage"
import { facebooklink, footerText, LinkedInlink, twitterlink } from "../pageObjects/shopPage"

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))
class CheckoutInformationPage extends MethodRepository {

    constructor (page){
        super(page)
    }

    async verifyErrorMsg()
    {
        return await this.verifyElementVisible(errormsg)
    }
    async verifyErrorMsgFN()
    {
        return await this.verifyElementText(errormsg,testdata.errorMsgFirstName)
    }
    async verifyErrorMsgLN()
    {
        return await this.verifyElementText(errormsg,testdata.errorMsgLasttName)
    }
    async verifyErrorMsgPC()
    {
        return await this.verifyElementText(errormsg,testdata.errorMsgPostalCode)
    }
    async verifyFirstNameField()
    {
        return await this.verifyElementVisible(firstName)
    }

    async verifyLastNameField()
    {
        return await this.verifyElementVisible(lastName)
    }

    async verifyPostalCodeField()
    {
        return await this.verifyElementVisible(firstName)
    }

    async getRandomString()
    {
        let randomNumb = Math.floor(Math.random()*100)+1
        return `name${new Date().getTime().toString()}${randomNumb}`
    }

    async typeFName()
    {
        const firstNameRand = await this.getRandomString()
        return await this.Fill(firstName, firstNameRand)
    }
    async typeLName()
    {
        const lastNameRand = await this.getRandomString()
        return await this.Fill(lastName, lastNameRand)
    }
    async typePostalCode()
    {
        const postalCodeRand = await this.getRandomString()
        return await this.Fill(postalCode, postalCodeRand)
    }

    async verifyCancelBtnEnabled ()
    {
        return await this.verifyElementEnabled(cancelBtn, testdata.notEnabledText)
    }

    async clickCancelBtn()
    {
        return await this.Click(cancelBtn)
    }

    async verifyContinueBtnEnabled ()
    {
        return await this.verifyElementEnabled(continueBtn, testdata.notEnabledText)
    }

    async clickContinueBtn ()
    {
        return await this.Click(continueBtn)
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
        return await this.Click(logoutbtn)
    }
    
}export default CheckoutInformationPage