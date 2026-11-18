import {describe, expect, test} from '@jest/globals';
import { Cliente } from "./src/Cliente.ts";

describe("Testes da classe Cliente", () => {
    // CENÁRIO QUE DÁ CERTO
    test("Deve cadastrar e retornar os dados do cliente corretamente", () => {
        const cliente = new Cliente();
        cliente.cadastrarCliente(
            "123.456.789-00",
            "João Silva",
            "joao@email.com",
            "Rua das Flores, 100",
            "96010-000"
        );

        expect(cliente.cpf).toBe("123.456.789-00");
        expect(cliente.nome).toBe("João Silva");
        expect(cliente.email).toBe("joao@email.com");
        expect(cliente.endereco).toBe("Rua das Flores, 100");
        expect(cliente.cep).toBe("96010-000");
    });

    // CENÁRIO QUE DÁ ERRADO (Falha de preenchimento / dados vazios)
    test("Não deve conter dados válidos quando cadastrado com strings vazias", () => {
        const cliente = new Cliente();
        cliente.cadastrarCliente("", "", "", "", "");

        expect(cliente.cpf).not.toBe("123.456.789-00");
        expect(cliente.nome).toBe("");
        expect(cliente.email).not.toContain("@");
    });
});