

export default new class Commons{

    get successBanner(){
        return cy.get('[class="alert alert-success alert-dismissible"]');
    }

    get cartDropdownButton(){
        return cy.get('#cart > .btn')
    }

    get cartButton(){
        return cy.get(':nth-child(4) > a > .fa')
    }

    get cartDropdownMenu(){
        return cy.get('#cart > .dropdown-menu')
    }

    openCartDropdown(){
        this.cartDropdownButton.click();
        this.cartDropdownMenu.should('be.visible');
    }

    successBannerShouldBeVisible(){
        this.successBanner.should('be.visible');
    }

    
}