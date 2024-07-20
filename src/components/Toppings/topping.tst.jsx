

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toppings from ".";

test("sosları ekleme ve çıkarma işleminin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();

  //1) Bileşeni renderla
  render(<Toppings />);

  //2) Bütün sos checboxlarını al
  const toppings = await screen.findAllByRole("checkbox");

  //3) Toplam spanı al
  const total = screen.getByTestId("total");

  //4) Tüm checkboxların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());

  //5) Toplam ücret 0 mı kontrol et
  expect(total.textContent).toBe("0");

  //6) Soslardan birine tıkla
  await user.click(toppings[4]);

  //7) Toplam ücret 3 mü kontrol et
  expect(total.textContent).toBe("3");

  //8) Farklı bir sos tikle
  await user.click(toppings[0]);

  //9) Toplam ücret 6 mı kontrol et
  expect(total.textContent).toBe("6");

  //10) Soslardan birinin tikini kaldır
  await user.click(toppings[0]);

  //11) Toplam ücret 3 mü kontrol et
  expect(total.textContent).toBe("3");

  //12) Soslardan birinin tikini kaldır
  await user.click(toppings[4]);

  //13) Toplam ücret 0 mü kontrol et
  expect(total.textContent).toBe("0");
});
