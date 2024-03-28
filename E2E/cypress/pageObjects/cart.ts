

export default new class Cart {

    get checkoutButton() {
        return cy.get('a[class*="btn-primary"]');
    }

    get continueBtn() {
        return cy.findByRole('button', { name: 'Continue' });
    }

    get firstNameField() {
        return cy.findByRole('textbox', { name: 'First Name' });
    }
    get lastNameField() {
        return cy.findByRole('textbox', { name: 'Last Name' });
    }
    get emailField() {
        return cy.findByRole('textbox', { name: 'E-Mail' });
    }
    get telephoneField() {
        return cy.findByRole('textbox', { name: 'Telephone' });
    }
    get Address1Field() {
        return cy.findByRole('textbox', { name: 'Address 1' });
    }
    get cityField() {
        return cy.findByRole('textbox', { name: 'City' });
    }
    get postCodeField() {
        return cy.findByRole('textbox', { name: 'Post Code' });
    }
    get countryDropdown() {
        return cy.findByRole('combobox', { name: 'Country' });
    }
    get stateDropdown() {
        return cy.findByRole('combobox', { name: 'Region / State' });
    }

    get confirmOrderBtn() {
        return cy.findByRole('button', { name: 'Confirm Order' });
    }

    selectRadio(value: string) {
        cy.get(`input[value=${value}]`).check();
    }

    navigateToCart() {
        cy.visit('/index.php?route=checkout/cart');
        cy.url().should('include', '/cart');
    }

    fillPersonalDetails(personalDetails: personalDetails) {
        this.firstNameField.type(personalDetails.firstName);
        this.lastNameField.type(personalDetails.lastName);
        this.emailField.type(personalDetails.email);
        this.telephoneField.type(personalDetails.telephone);
        this.Address1Field.type(personalDetails.address1)
        this.cityField.type(personalDetails.city);
        this.postCodeField.type(personalDetails.postCode);
        this.countryDropdown.select(personalDetails.country);
        this.stateDropdown.select(personalDetails.state);
    }
}

export enum PaymentMethod {
    CashOnDeposit = 'cod',
    BankTransfer = 'bank_transfer'
}

type personalDetails = {
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    company: string,
    address1: string,
    address2: string,
    city: string,
    postCode: string,
    country: string,
    state: string,
}