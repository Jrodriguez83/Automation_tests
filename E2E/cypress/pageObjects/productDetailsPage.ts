

export default new class ProductDetails {

    get addToCartBtn() {
        return cy.findByRole('button', { name: 'Add to Cart' });
    }

    clickCheckbox(value:string){
        cy.get(`input[type="checkbox"][value="${value}"]`).check();
    }

    selectDropdown(value:string){
        cy.get('select').select(value);
    }

    enterTextArea(value:string){
        cy.get('textarea[placeholder="Textarea"]').type(value);
    }

}