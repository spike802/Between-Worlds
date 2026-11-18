import { describe, expect, test } from '@jest/globals';
import { Produtos } from "./src/Produto.ts";
import { Livro } from "./src/Livro.ts";
import { ActionFigure } from "./src/ActionFigure.ts";
import { Figurinha } from "./src/Figurinha.ts";

describe("Testes de Produtos e Subclasses", () => {
    // CENÁRIO QUE DÁ CERTO (Cadastro e Estoque)
    test("Deve cadastrar Livro, ActionFigure e Figurinha e adicionar estoque corretamente", () => {
        const livro = new Livro();
        livro.cadastrarLivro("O Hobbit", "Fantasia", 59.90, "Tolkien", "1937", 310, "978-8595084742", 10);
        livro.adicionarEstoque(5);

        const actionFigure = new ActionFigure();
        actionFigure.cadastrarActionFigure("Goku", "Boneco articulado", 199.90, "Dragon Ball", "PVC", 3);

        const figurinha = new Figurinha();
        figurinha.cadastrarFigurinha("Neymar", "Figurinha brilhante", 10.00, "Copa", "Rara", 50);

        expect(livro.nome).toBe("O Hobbit");
        expect(livro.isbn).toBe("978-8595084742");
        expect(livro.estoque).toBe(15);
        expect(actionFigure.franquia).toBe("Dragon Ball");
        expect(figurinha.raridade).toBe("Rara");
    });

    // CENÁRIO QUE DÁ CERTO (Desconto)
    test("Deve aplicar desconto corretamente no preço do produto", () => {
        const produto = new Produtos();
        produto.preco = 200;
        produto.aplicarDesconto(25);

        expect(produto.preco).toBe(150);
    });

    // CENÁRIO QUE DÁ ERRADO (Desconto inválido)
    test("Deve lançar erro ao aplicar porcentagem de desconto inválida", () => {
        const produto = new Produtos();
        produto.preco = 200;

        expect(() => {
            produto.aplicarDesconto(0);
        }).toThrow("Porcentagem de desconto inválida.");

        expect(() => {
            produto.aplicarDesconto(120);
        }).toThrow("Porcentagem de desconto inválida.");
    });
});