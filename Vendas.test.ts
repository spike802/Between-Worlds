import {describe, expect, test} from '@jest/globals';
import { Vendas } from "./src/Vendas.ts";
import { Livro } from "./src/Livro.ts";
import { Cliente } from "./src/Cliente.ts";

describe("Testes da classe Vendas", () => {
    // CENÁRIO QUE DÁ CERTO
    test("Deve realizar a venda, calcular o valor total e reduzir o estoque", () => {
        const cliente = new Cliente();
        cliente.cadastrarCliente("111.222.333-44", "Maria Souza", "maria@email.com", "Av. Brasil, 50", "96020-000");

        const livro = new Livro();
        livro.cadastrarLivro("O Hobbit", "Fantasia", 100.00, "Tolkien", "1937", 310, "978-8595084742", 10);

        const venda = new Vendas(livro, cliente);
        venda.vender(3);

        expect(venda.valorTotal).toBe(300.00);
        expect(venda.quantidade).toBe(3);
        expect(venda.cliente.nome).toBe("Maria Souza");
        expect(livro.estoque).toBe(7);
    });
});