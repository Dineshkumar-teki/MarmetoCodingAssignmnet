fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the fetched data
    const product = data.product;

    //Create vendor title
    const titleContainer = document.getElementById('titleContainer');
    
    const vendorName = document.createElement('h4')
    // vendorName.classList.add('');
    vendorName.textContent = product.vendor;
    titleContainer.appendChild(vendorName);

    // Create product title
    const title = document.createElement('h1');
    title.classList.add('product-title');
    title.textContent = product.title;
    titleContainer.appendChild(title);

    // Create product price
    const priceContainer = document.getElementById('priceContainer');

    const PriceAndDiscount = document.createElement('div');
    priceContainer.appendChild(PriceAndDiscount);
    PriceAndDiscount.classList.add('price-discount');

    const price = document.createElement('h1');
    price.classList.add('price');
    price.textContent = ` ${product.price}.00`;
    PriceAndDiscount.appendChild(price);

    const discount = document.createElement('p');
    let pricevalue = parseInt(`${product.price}`.slice(1,));
    let compareValue = parseInt(`${product.compare_at_price}`.slice(1,));
    let discountcal = parseInt(((compareValue - pricevalue)/compareValue)*100);
    discount.textContent = `${discountcal}% OFF`;
    discount.classList.add('discount')
    PriceAndDiscount.appendChild(discount)

    const comparePrice = document.createElement('p');
    comparePrice.textContent = `${product.compare_at_price}.00`;
    comparePrice.classList.add('comparePrice');
    priceContainer.appendChild(comparePrice);

    // Create product options
    const sizeAndCartContainer = document.getElementById('sizeAndCartContainer');
    const colorContainer = document.getElementById('colorContainer');

    const options = document.createElement('div');
    options.classList.add('product-options');
    product.options.forEach(option => {
      if (option.name === 'Color') {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('color-option');
        option.values.forEach(value => {
          const colorDiv = document.createElement('div');
          colorDiv.classList.add('colordiv');
          let color = Object.values(value)[0];
          const colorname = document.createElement('p');
          colorname.textContent = Object.keys(value)[0];

          colorname.classList.add('color-name');
          colorDiv.appendChild(colorname);
          colorDiv.style.backgroundColor = color;
          optionDiv.appendChild(colorDiv);

          colorDiv.addEventListener('click',() => {
            optionDiv.querySelectorAll('.colordiv').forEach(div => {
              div.classList.remove('selected');
            });
            colorDiv.classList.toggle('selected');
          })
        });
        colorContainer.appendChild(optionDiv);
      } else {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('product-option-size');
        option.values.forEach(value => {
          const eachoptiondiv = document.createElement('div');
          eachoptiondiv.classList.add('eachSizeOption')
          const input = document.createElement('input');
          
          input.type = 'radio';
          input.name = option.name.toLowerCase();
          
          input.value = typeof value === 'object' ? Object.keys(value)[0] : value;
          input.id = input.value;
          const label = document.createElement('label');
          label.textContent = typeof value === 'object' ? Object.keys(value)[0] : value;
          label.htmlFor = input.id;
          eachoptiondiv.appendChild(input);
          eachoptiondiv.appendChild(label);
          optionDiv.appendChild(eachoptiondiv);
        });


        const countAndCart = document.createElement('div');
        countAndCart.classList.add('countAndCart');

        const countContainer = document.createElement('div');
        countContainer.classList.add('counter');

        const minus = document.createElement('p');
        minus.textContent = '-';
        countContainer.appendChild(minus);
        minus.addEventListener('click', () => {
          let num = parseInt(countnum.textContent)
          if (num > 1){
            countnum.textContent = num - 1;
            minus.classList.remove('minuserrorcolor');
          }else{
            countnum.textContent = '1';
            minus.classList.add('minuserrorcolor');
          }
          
        })

        const countnum = document.createElement('p');
        countnum.textContent = '1';
        countContainer.appendChild(countnum)

        const plus = document.createElement('p');
        plus.textContent = '+';
        countContainer.appendChild(plus);
        plus.addEventListener('click', () => {
          countnum.textContent = parseInt(countnum.textContent)+1;
        })

        countAndCart.appendChild(countContainer);

        let cartButton = document.createElement('div');
        let iconContainer = document.createElement('div');
        let cartIcon = document.createElement("i");
        cartIcon.classList.add("fa-solid", "fa-bag-shopping");
        iconContainer.appendChild(cartIcon);
        cartButton.appendChild(iconContainer);

        let cartContent = document.createElement('p')
        cartContent.textContent = 'Add to Cart';
        cartButton.classList.add('cartbutton');
        cartButton.appendChild(cartContent);
        countAndCart.appendChild(cartButton)

        sizeAndCartContainer.appendChild(optionDiv);
        sizeAndCartContainer.appendChild(countAndCart);



        let cartmsg = document.createElement('p');
        cartmsg.classList.add('cartmsg');
        // Add event listener to the cart button
        cartButton.addEventListener('click', () => {
          try{
            const selectedColorElement = document.querySelector('.color-option .colordiv.selected');
            const finalselectedColor = selectedColorElement.querySelector('.color-name').textContent;
  
            // Retrieve selected size option
            const selectedSizeElement = document.querySelector('.product-option-size input:checked + label').textContent;
  
            // Display message
            
            cartmsg.textContent = '';
            cartmsg.textContent = `${product.title} with color ${finalselectedColor} and Size ${selectedSizeElement} added to cart`;
            
            sizeAndCartContainer.appendChild(cartmsg);
          }catch(e){
            cartmsg.textContent = '';
            cartmsg.textContent = 'Please select one color and one size option.';
            sizeAndCartContainer.appendChild(cartmsg);
          }
        });

      }
    });

    // Create product description
    const descriptionCon = document.getElementById('descriptionContainer');
    const description = document.createElement('div');
    // description.classList.add('product-description');
    description.innerHTML = product.description;
    descriptionCon.appendChild(description);



    //getting 404 not found error while fetching images.
    // Create product images
    // let imageContainerEl = document.querySelector('.imageContainer');
    // let moreImagesContainer = document.querySelector('.moreImagesContainer');
    // // moreImagesContainer.classList.add('');
    // product.images.forEach(image => {
    //   const img = document.createElement('img');
    // //   img.classList.add('');
    //   img.src = image.src;
    //   moreImagesContainer.appendChild(img);
    // });
    // imageContainerEl.appendChild(moreImagesContainer);

    let mainimg = document.querySelector('.main');
    let subImage1 = document.querySelector('.sub1');
    let subImage2 = document.querySelector('.sub2');
    let subImage3 = document.querySelector('.sub3');
    let subImage4 = document.querySelector('.sub4');
    
    subImage1.addEventListener('click',() => {
      subImage1.classList.add('imgeffect');
      mainimg.src = 'images/dress5.webp';
      subImage2.classList.remove('imgeffect')
      subImage3.classList.remove('imgeffect')
      subImage4.classList.remove('imgeffect')      
    })
    subImage2.addEventListener('click',() => {
      subImage2.classList.add('imgeffect');
      mainimg.src = 'images/dress4.webp';
      subImage1.classList.remove('sub1');
      subImage1.classList.remove('imgeffect')
      subImage3.classList.remove('imgeffect')
      subImage4.classList.remove('imgeffect')
    })
    subImage3.addEventListener('click',() => {
      subImage3.classList.add('imgeffect');
      mainimg.src = 'images/dress3.webp';
      subImage1.classList.remove('sub1');
      subImage2.classList.remove('imgeffect')
      subImage1.classList.remove('imgeffect')
      subImage4.classList.remove('imgeffect')
    })
    subImage4.addEventListener('click',() => {
      subImage4.classList.add('imgeffect');
      mainimg.src = 'images/dress2.webp';
      subImage1.classList.remove('sub1');
      subImage2.classList.remove('imgeffect')
      subImage3.classList.remove('imgeffect')
      subImage1.classList.remove('imgeffect')
    })


  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



