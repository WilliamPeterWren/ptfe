
import CartItem from "./CartItem";
import Perhap from "./Perhap";

function Cart() {
 

  return (
    <section className="mx-auto bg-gray-200">
      <div className="h-[4px] bg-red-400 my-4"></div>
      <div className="px-80">
        <CartItem />
      </div>

      <div className="px-80">
        <Perhap />
      </div>
    </section>
  );
}

export default Cart;
