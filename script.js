   // assign DOM elements to constants
   const orderForm = document.querySelector('#order-form');
   const selectSize = document.querySelector('#size');
   const spanPrice = document.querySelector('#price');
   const inputQuantity = document.querySelector('#quantity');
   const btnDecrQuantity = document.querySelector('#decr-quantity');
   const btnIncrQuantity = document.querySelector('#incr-quantity');
   const spanHealthWarning = document.querySelector('#health-warning');
   const spanSum = document.querySelector('#sum');
   const inputCoupon = document.querySelector('#coupon');
   const spanCouponMessage = document.querySelector('#coupon-message');
   const spanTotal = document.querySelector('#total');

    // table to lookup prices according to pizza size
    const priceForSize = {
      'l': 5,
      'xl': 7.50,
      'xxl': 17,
    };

    // discount code and amount
    const discountCode = 'mextexgood';
    const discountAmount = 0.135; // 13.5%

    // this function will be called everytime a change is made in the form, to update all the information
    const updateForm = () => {
      // make sure quantity is at least 1 by setting quantity to 1 if its less
      if (inputQuantity.value < 1) {
        inputQuantity.value = 1;
      }

      // if xxl size is selected, unhide health warning
      if (selectSize.value === 'xxl') {
        spanHealthWarning.classList.remove('hidden');
      }
      // else (if xxl size is not selected) hide health warning
      else {
        spanHealthWarning.classList.add('hidden');
      }

      // lookup the price for the selected size 
      const price = priceForSize[selectSize.value];
      // calculate sum (price * quantity)
      const sum = price * inputQuantity.value;
      // check if discount code is valid
      const isValidCouponCode = inputCoupon.value === discountCode;

      // create total and set it equal to sum
      let total = sum;
      if (isValidCouponCode) { // if discount code is valid
        // apply discount to total
        total = total * (1 - discountAmount) // ex. 5 * (1 - 0.135) == 5 * 0.865 == 4.33;

        // update info message to let user know that discount code is valid
        spanCouponMessage.textContent = (100 * discountAmount) + '% discount applied';
        // remove invalid class and add valid class to update styles
        spanCouponMessage.classList.remove('invalid');
        spanCouponMessage.classList.add('valid');
      }
      else if (inputCoupon.value != '') { // else (if discount code is not valid but also not empty)
        // update info message to let user know that discount code is not valid
        spanCouponMessage.textContent = 'Invalid discount code';
        // remove valid class and add invalid class to update styles
        spanCouponMessage.classList.remove('valid');
        spanCouponMessage.classList.add('invalid');
      }
      else { // else (if discount code is empty)
        // remove info message
        spanCouponMessage.textContent = '';
      }

      // update the price, sum, and total elements with the correct values
      spanPrice.textContent = price.toFixed(2) + ' €';
      spanSum.textContent = sum.toFixed(2) + ' €';
      spanTotal.textContent = total.toFixed(2) + ' €';

      // make sure users can't enter a negative quantity by
      // disabling the decrement button if quantity is less or equals to 1
      if (inputQuantity.value <= 1) {
        btnDecrQuantity.disabled = true;
      }
      // else (if quantity is above 1), reenable the decrement button
      else {
        btnDecrQuantity.disabled = false;
      }
    };

    // call function to update the form when page loads
    updateForm();

    // listen for click events on the decrement button
    btnDecrQuantity.addEventListener('click', ev => {
      ev.preventDefault(); // prevent the form from refreshing the page
      inputQuantity.value--; // decrement the quantity
      updateForm(); // update form to display the changes
    });

    // listen for click events on the increment button
    btnIncrQuantity.addEventListener('click', ev => {
      ev.preventDefault(); // prevent the form from refreshing the page
      inputQuantity.value++; // increment the quantity
      updateForm(); // update form to display the changes
    });

    // listen for input change events on the form, and update the form for each event
    orderForm.addEventListener('input', updateForm);

    // listen for submit events on the form and show an alert message,
    // letting the user know the order was submitted successfully
    orderForm.addEventListener('submit', ev => {
      alert('Your order has been submitted. Thank you!');
    });
