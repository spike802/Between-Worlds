import { describe, expect, it, test } from '@jest/globals';
import { Livro } from "./src/Livro.ts";

describe("Quando manipular livros", () => {


    /* it("deve calcular desconto no preço final", () => {
        //cenario
        const book: Livro = new Livro();
        book.preco = 100;

        // execuçao
        book.aplicarDesconto(10)
        // validar
        expect(book.preco()).toBeLessThan(book.precoDesconto())

    }) */

    it("deve ser possivel vender um item ", () => {
        //cenario
        const book: Livro = new Livro()
        book.estoque = 10;
        //declarar proprimedade ****** 

        //execuçao
        book.vender(5)
        //declarar propriedadr/metodo ****** 


        //valiação
        expect(book.estoque).toBe(5)

})

})
