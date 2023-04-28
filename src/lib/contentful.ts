import { getEntries } from "./contentfulClient";
import Util from "./utils";
import type { QueryItem } from "../types";

const { items } =
  (console.log("Salvando dados em variável"), await getEntries());

class Client {
  dados: QueryItem[];

  constructor(dados: QueryItem[]) {
    this.dados = dados;
  }

  useConfig() {
    const config = Util.findFromId(this.dados, "configuracao") as QueryItem;
    console.log("Acessando configuracao");
    return config.fields;
  }

  useContato() {
    const contato = Util.findFromId(this.dados, "contato") as QueryItem;
    console.log("Acessando contato");
    return contato.fields;
  }

  getNovidades() {
    const novidades = Util.findAllFromId(this.dados, "novidades");
    console.log("Acessando contato");

    return novidades.map((item) => item.fields);
  }
}

export const client = new Client(items);
