export type WhatsAppOrderItem = {
  title: string;
  colorLabel?: string;
  sizeLabel?: string;
  quantity: number;
  unitPrice: number;
};

export type WhatsAppOrderPayload = {
  items: WhatsAppOrderItem[];
  intro?: string;
  customerNote?: string;
};

const priceFormatter = new Intl.NumberFormat("ru-RU");

function formatPrice(value: number): string {
  return `${priceFormatter.format(value)} ₽`;
}

function normalizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function getWhatsAppOrderTotal(items: WhatsAppOrderItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

export function buildWhatsAppOrderMessage({
  items,
  intro = "Здравствуйте! Хочу оформить заказ:",
  customerNote,
}: WhatsAppOrderPayload): string {
  const lines = items.map((item, index) => {
    const meta = [
      item.colorLabel ? `цвет: ${item.colorLabel}` : null,
      item.sizeLabel ? `размер: ${item.sizeLabel}` : null,
      `кол-во: ${item.quantity}`,
      `цена: ${formatPrice(item.unitPrice)}`,
    ]
      .filter(Boolean)
      .join(", ");

    return `${index + 1}. ${item.title} (${meta})`;
  });

  const total = getWhatsAppOrderTotal(items);
  const noteBlock = customerNote ? `\n\nКомментарий:\n${customerNote}` : "";

  return `${intro}\n\n${lines.join("\n")}\n\nИтого: ${formatPrice(total)}${noteBlock}`;
}

export function buildWhatsAppUrl(phone: string, payload: WhatsAppOrderPayload): string {
  const normalizedPhone = normalizePhoneNumber(phone);
  const message = buildWhatsAppOrderMessage(payload);

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
