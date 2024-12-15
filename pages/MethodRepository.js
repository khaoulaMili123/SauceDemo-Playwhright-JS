import { expect } from '@playwright/test'

class MethodRepository {

// Constructor method initializes the page object, which represents the web page on which actions will be executed.
constructor (page)
    {
        this.page = page
    }

// Method to navigate to the URL
async open (url)
    {
        return await this.page.goto(url)
    }

// Methods to verify the URL and title of the page
async getURl()
    {
        return await this.page.url()
    }

    async getTitle()
    {
        return await this.page.title()
    }

// Pauses script execution (useful for debugging)
async pause ()
    {
        return await this.page.pause()
    }

    //Waits

    async wait()
    {
         return await this.page.waitForTimeout(1000)
    }

    

    //Interactions with elements

    //1-click
    async HardClick(selector)
    {
        return await this.page.$eval(selector, element=>element.click())
    }

    async Click(selector)
    {
        return await this.page.click(selector)
    }

    async ClickAllElements(selector)
    {
        const Elements = await this.page.locator(selector)
        const count = Elements.count()
        for (let i; i<count;i++){
            await Elements.nth(i).Click()
        }
    }

    async ClickAllLinks (selector)
    {
        const Links = await this.page.locator(selector)
        const count = Links.count()
        for(i;i<count;i++){
            await Links.nth(i).Click({modifiers: ['Control', 'Shift']})
        }
    }

    //// Fill a field
    async Fill(selector, text)
    {
        return await this.page.locator(selector).fill(text)
    }

// Simulates a key press on an element
    async KeyPress (selector, key)
    {
        return await this.page.press(selector, key)
    }

    //Verifications  

    // 1- Verifies that the specified element contains the exact provided text
    async verifyElementText(selector, text)
    {
        const Text = await this.page.textContent(selector)
        return expect (Text.trim()).toBe(text)
    }
    async verifyJSElementValue(selector, text) {
		const textValue = await this.page.$eval(selector, element => element.value)
		return expect(textValue.trim()).toBe(text)
	}

    // 2- Checks if an element contains a given text
    async verifyElementContainstext(selector, text)
    {
        const Text = await this.page.locator(selector)
        return expect (Text).toContainText(text)
    }

    //3-Check if an attribute of an element contains a specific value
    async verifyElementAttribut(selector, attribut, value)
    {
        const textValue = await this.page.getAttribute(selector, attribut)
        return expect(textValue.trim()).toBe(value)
    }

    //4-check if an element is visible on the page
    async verifyElementVisible(selector)
    {
        const element= await this.page.locator(selector)
        const isVisible = await element.isVisible()
        expect(await isVisible).toBeTruthy()
    }


    //5-check if an element is invisible on the page
    async verifyElementInvisible(selector)
    {
        const element = await this.page.locator(selector)
        const isHidden = await element.isHidden()
        return expect(isHidden).toBeTruthy()
    }

     //6-check if an element is enabled
     async verifyElementEnabled (selector, errorMessage)
     {
        const element = await this.page.locator(selector)
        try{
            const isEnabled = await element.isEnabled()
            expect (isEnabled).toBeTruthy()}
        catch (error){
            throw new Error(`${errorMessage}`)
        }
     }
    //7-check if an element is checked
    async verifyElementChecked (selector, errorMessage)
    {
       const element = await this.page.locator(selector)
       try{
           const isCheked = await element.isChecked()
           expect (isCheked).toBeTruthy()}
       catch (error){
           throw new Error(`${errorMessage}`)
       }
    }
    //Selections 

    //1-select an option from a drop-down list
    async selectFromDropDown (selector, text){
        const dropdown = await this.page.locator(selector)
        return await dropdown.selectOption({value : text})
    }

    //2-retrieves the text of the first item in a list 
    async getFirstElement (selector){
        const listOfElement = await this.page.locator(selector)
        const count = listOfElement.count()
        for (i;i<count;i++){
            const firstElement = listOfElement.nth(0).textContent()
            return firstElement
        }
    }
    
    //3-retrieves the last item in a list
    async getLastElement (selector){
        const listOfElement = await this.page.locator(selector)
        const count = listOfElement.count()
        for (i;i<count;i++){
            const lastElement = listOfElement.nth(count-1).textContent()
            return lastElement
        }
    }
}
export default MethodRepository