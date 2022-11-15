import { describe, it , expect} from "vitest";
import { mount } from "@vue/test-utils";
import ModalCustomVue from "../modal/ModalCustom.vue";
import InputCustomVue from "../inputCustom/InputCustom.vue";

const $t = () => {};
describe("test component ModalCustom", () => {
  it("test title modal", () => {
    const wrapper = mount(ModalCustomVue, {
      props: {
        category: "all",
        title: "titleTeste",
        url: {
          visits: 1,
          longURL: "string",
          shortURL: "stridngd",
        },
      },
      global: {
        mocks: {
          $t,
        },
      },
    });
    const title = wrapper.find("h2");

    expect(title.text()).toContain("titleTeste");
  });
  it("test button exit", () => {
    const wrapper = mount(ModalCustomVue, {
      props: {
        category: "all",
        title: "titleTeste",
        url: {
          visits: 1,
          longURL: "string",
          shortURL: "stridngd",
        },
      },
      global: {
        mocks: {
          $t,
        },
      },
    });
    const buttonExit = wrapper.find("button");
    buttonExit.trigger("click");
    const eventos = wrapper.emitted("close");
    expect(eventos).toHaveLength(1);
  });
  it("test de dados do modal", () => {
    const wrapper = mount(ModalCustomVue, {
      props: {
        category: "all",
        title: "titleTeste",
        url: {
          visits: 1,
          longURL: "string",
          shortURL: "testeLinkEncurtado",
        },
      },
      global: {
        mocks: {
          $t,
        },
      },
    });
    const visits = wrapper.find("#visits");
    const shortenedLink = wrapper.find("#shortenedLink");
    const originalUrl = wrapper.find("#originalUrl");
    expect(visits.text()).toContain("1");
    expect(shortenedLink.text()).toContain("testeLinkEncurtado");
    expect(originalUrl.text()).toContain("string");
  });
});
describe("test component inputCustom", () => {
  it("test emmit function clear", () => {
    const wrapper = mount(InputCustomVue, {
      props: {
        id: "input",
      },
    });
    const input = wrapper.find("input");
    input.trigger("keydown");
    const events = wrapper.emitted("onKeyDown");
    expect(events).toHaveLength(1);
  });
  it("test emmit function insertedValue", () => {
    const wrapper = mount(InputCustomVue, {
      props: {
        id: "input",
      },
    });
    const input = wrapper.find("#input");
    input.setValue("novoValor");
    const events = wrapper.emitted("insertedValue");
    expect(events).toHaveLength(1);
  });
  it("test type input", () => {
    const wrapper = mount(InputCustomVue, {
      props: {
        id: "input",
        type: "password",
      },
    });
    const eye = wrapper.find(".eye");
    eye.trigger("click");
    const input = wrapper.find("input");
    expect(input.element.type).toBe("password");
  });
});
