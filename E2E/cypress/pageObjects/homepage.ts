

export default new class HomePage {

    get featuredProducts() {
        return cy.get('[class^="product-layout"]');
    }

    get buttonGroup(){
        return cy.get('[class="button-group"]');
    }

    get addToCartBtn(){
        return this.buttonGroup.get('button').eq(0)
    }
    get addToWishListBtn(){
        return this.buttonGroup.get('button').eq(1)
    }
    get compareProductBtn(){
        return this.buttonGroup.get('button').eq(2)
    }

    getFeaturedProductByIndex(index: number) {
        return this.featuredProducts.eq(index - 1);
    }

    clickAddToCart(index: number){
        this.getFeaturedProductByIndex(index).within(()=>{
            this.addToCartBtn.click();
        });
    }

    openFeaturedProductByIndex(index: number){
        this.getFeaturedProductByIndex(index).within(()=>{
            cy.get('a').first().click();
        });
    }

    navigateToProductById(productId:number){
        cy.visit(`/index.php?route=product/product&product_id=${productId}`);
    }

    


}