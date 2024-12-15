import fs from "fs"
import MethodRepository from "./MethodRepository"
import { baseURL } from "../ConfigUtil"
import { errorMsg, loginButton, logincredt, LoginPagelogo, password, passwordcredt, username } from "../pageObjects/homePage"


const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

class HomePage extends MethodRepository {
    constructor (page)
    {
        super(page)
    }   

    async openUrl()
    {
        await super.open(baseURL)
        //return await super.WaitPageLoaded()
    }

    async PageLogo() 
    {
        return await this.verifyElementVisible(LoginPagelogo)
    }

    async usernameFieldVisible()
    {
        return await this.verifyElementVisible (username)
    }
    async passwordFieldVisible()
    {
        return await this.verifyElementVisible (password)
    }

    async loginButtonEnabled()
    {
        return await this.verifyElementEnabled (loginButton, testdata.errormsg)
    }

    async loginCredentVisible()
    {
        return await this.verifyElementVisible(logincredt)
    }

    async passwordCredentVisible()
    {
        return await this.verifyElementVisible(passwordcredt)
    }

    async loginAs_SU()
    {
        await this.Fill(username, testdata.ST_user)
        await this.Fill(password, testdata.Password)
        await this.Click(loginButton)
    }

    
    async loginAs_LO_user()
    {
        await this.Fill(username, testdata.LO_user)
        await this.Fill(password, testdata.Password)
        await this.Click(loginButton)
    }

    
    async loginAs_PB_user()
    {
        await this.Fill(username, testdata.PB_user)
        await this.Fill(password, testdata.Password)
        await this.Click(loginButton)
    }

    
    async loginAs_PG_user()
    {
        await this.Fill(username, testdata.PG_user)
        await this.Fill(password, testdata.Password)
        await this.Click(loginButton)
    }

    async verifyErrorMsg()
    {
        return await this.verifyElementVisible(errorMsg)
    }

    async VerifyLO_UserErrorMsg()
    {
        return await this.verifyElementText(errorMsg, testdata.errorMessageLO_User)
    }

}
export default HomePage