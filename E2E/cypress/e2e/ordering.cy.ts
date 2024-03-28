import cart from "../pageObjects/cart";
import commons from "../pageObjects/commons";
import homepage from "../pageObjects/homepage";
import productDetailsPage from "../pageObjects/productDetailsPage";
import { PaymentMethod } from "../pageObjects/cart";

describe('Prieba E2E Opcion 3', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable)=>{
            return false;
        });
        cy.visit('/');
    });

    it('Order 2 products', () => {

        addProductFromHomePage({ productIndex: 2, itemCount: 1 });

        addProductFromDetailsPage({ dropdownValue: '15', itemCount: 2, productId: 30 });

        validateCartDropdownCount();

        cart.navigateToCart();

        checkoutOptionsSection();

        cy.fixture('userDetails.json').then((userDetails) => {
            cart.fillPersonalDetails(userDetails);
        });
        cart.continueBtn.click();

        //DeliveryMethodSection:
        cart.continueBtn.click();

        paymentMethodSection();

        validateOrderItemCount(2);

        cart.confirmOrderBtn.click();

        cy.contains('h1', 'Your order has been placed!').should('be.visible');
    });

    interface AddProductFromHomePage {
        productIndex: number,
        itemCount: number
    }
    interface AddProductFromDetailsPage {
        productId: number,
        dropdownValue: string,
        itemCount: number,
    }

    function addProductFromHomePage({ productIndex, itemCount }: AddProductFromHomePage) {
        homepage.clickAddToCart(productIndex);
        commons.successBannerShouldBeVisible();
        commons.cartDropdownButton.should('include.text', `${itemCount} item`);
    }

    function addProductFromDetailsPage({ productId, dropdownValue, itemCount }: AddProductFromDetailsPage) {
        homepage.navigateToProductById(productId)
        productDetailsPage.selectDropdown(dropdownValue)
        productDetailsPage.addToCartBtn.click();
        commons.successBannerShouldBeVisible();
        commons.cartDropdownButton.should('include.text', `${itemCount} item`);
    }

    function validateCartDropdownCount(itemCount: number = 2) {
        commons.openCartDropdown();
        commons.cartDropdownMenu.within(() => {
            cy.get('tbody').eq(0).find('tr').its('length').should('eq', itemCount);
        });
    }

    function checkoutOptionsSection() {
        cart.checkoutButton.click();
        cart.selectRadio('guest');
        cart.continueBtn.click();
    }

    function paymentMethodSection() {
        cart.selectRadio(PaymentMethod.CashOnDeposit);
        cart.continueBtn.click();
        cy.get('div[class="alert alert-danger alert-dismissible"]').should('be.visible');
        cy.get('input[name="agree"]').check();
        cart.continueBtn.click();
    }

    function validateOrderItemCount(itemCount: number) {
        cy.get('table > tbody').last().within(() => {
            cy.get('tr').should('have.length', itemCount);
        });
    }
});