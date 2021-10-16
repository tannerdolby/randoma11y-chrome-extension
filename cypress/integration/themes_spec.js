import { themes } from "../support/index";
import { hexToRGB } from "../support/index";

describe("Testing the popup UI functionality", () => {
    before(() => {
        cy.visit("../../tests/index.html")
    });

    it("Main heading is rendered", () => {
        cy.get(".popup h1").should("have.text", "Choose a randoma11y theme for your current tab")
    });

    it("Current theme renders after selecting one from grid", () => {
        cy.get(".current-theme").children().should("have.length", 3)
        cy.get(".palette").children().should("have.length", 2)
        cy.get(".palette").children().eq(0).should("have.class", "color-one")
        cy.get(".palette").children().eq(1).should("have.class", "color-two")
        cy.get(".palette .color-one").should("have.text", themes[12]["palette"]["colorOne"])
        cy.get(".palette .color-two").should("have.text", themes[12]["palette"]["colorTwo"])
        cy.get(".palette .color-one").should("have.css", "background-color", hexToRGB(themes[12]["palette"]["colorOne"]))
        cy.get(".palette .color-two").should("have.css", "background-color", hexToRGB(themes[12]["palette"]["colorTwo"]))
        cy.get(".palette .color-one").should("have.css", "color", hexToRGB(themes[12]["palette"]["colorTwo"]))
        cy.get(".palette .color-two").should("have.css", "color", hexToRGB(themes[12]["palette"]["colorOne"]))
    });

    it("Themes grid is rendered", () => {
        cy.get(".theme-grid li")
            .should("have.length", themes.length)
            .each((el, index) => {
                cy.get(el).should(($el) => {
                    const children = $el.children();
                    const backgroundColor = children.css("background-color");
                    const color = children.css("color");
                    expect(parseFloat($el.text(), 10)).to.equal(themes[index]["palette"]["contrast"]["ratio"])
                    expect(children).to.have.length(1)
                    expect(children).to.have.attr("class", "theme-color")
                    expect(backgroundColor).to.equal(hexToRGB(themes[index]["palette"]["colorOne"]))
                    expect(color).to.equal(hexToRGB(themes[index]["palette"]["colorTwo"]))
                });
            });
    });

    it("Footer content should match", () => {
        cy.get(".themes-credit").should(($el) => {
            expect($el).to.have.length(1);
            expect($el).to.have.attr("class", "themes-credit")
            expect($el.text()).to.contain("Themes provided by randoma11y.com");
            expect($el.children()).to.have.length(1)
            expect($el.children().text()).to.contain("randoma11y.com")
            expect($el.children()).to.have.attr("href", "https://randoma11y.com")
            expect($el.children()).to.have.attr("target", "_blank")
        });
    });
});