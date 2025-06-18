// In your React component (e.g., in a checkout success page or component)

const generateOrderHtmlBody = (
  orderItems,
  orderTotal,
  customerName,
  orderId
) => {
  let tableRowsHtml = "";
  orderItems.forEach((item) => {
    // Calculate effective price for display in email
    const effectivePrice = item.salePrice > 0 ? item.salePrice : item.price;
    const itemTotalPrice = effectivePrice * item.quantity - item.discount;

    tableRowsHtml += `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">
            <img src="${item.imageUrl}" alt="${
      item.productName
    }" style="width: 50px; height: 50px; margin-right: 10px; vertical-align: middle;">
            ${item.productName} (${item.variantName})
          </td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${
            item.quantity
          }</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${item.price.toFixed(
            2
          )}</td>
          ${
            item.salePrice > 0
              ? `<td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: green;">$${item.salePrice.toFixed(
                  2
                )}</td>`
              : '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">N/A</td>'
          }
          ${
            item.discount > 0
              ? `<td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: red;">-$${item.discount.toFixed(
                  2
                )}</td>`
              : '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$0.00</td>'
          }
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${itemTotalPrice.toFixed(
            2
          )}</td>
        </tr>
      `;
  });

  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Order Confirmation - #${orderId}</h2>
        <p>Dear ${customerName},</p>
        <p>Thank you for your purchase! Your order details are below:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Qty</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Price</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Sale Price</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Discount</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Item Total</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">$${orderTotal.toFixed(
                2
              )}</td>
            </tr>
          </tfoot>
        </table>
  
        <p>We will notify you once your order has been shipped. If you have any questions, please contact us.</p>
        <p>Sincerely,</p>
        <p>The Peter Ecom Team</p>
      </div>
    `;
};
