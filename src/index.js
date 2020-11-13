class Product {
	constructor(name, price, year) {
		this.name = name;
		this.price = price;
		this.year = year;
	}
}

class UI {
	addProduct({ name, price, year }) {
		if (name === '' || price === '' || year === '')
			return this.showMessage('Ingresa todos los datos para continuar', 'warning');

		const productList = document.getElementById('product-list');
		const element = document.createElement('div');
		element.innerHTML = `
            <div class='card text-center mb-4'>
                <div class='card-body'>
                    <strong>Product</strong>: ${name}
                    <strong>Product</strong>: ${price}
                    <strong>Product</strong>: ${year}
                    <a href='#' class='btn btn-danger' name='delete'>Delete</a>
                </div>
            </div>
        `;

		productList.appendChild(element);
		this.showMessage('Product added successfully', 'success');
	}

	deleteProduct(element) {
		element.name === 'delete' && element.parentElement.parentElement.parentElement.remove();
		element.name === 'delete' && this.showMessage('Product deleted successfully', 'danger');
	}

	showMessage(message, type) {
		const div = document.createElement('div');
		div.className = `alert alert-${type} mt-2`;
		div.appendChild(document.createTextNode(message));
		//showing message in DOM
		const container = document.querySelector('.container');
		const app = document.querySelector('#App');
		container.insertBefore(div, app);

		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}

	resetForm(target) {
		return target.reset();
	}
}

//events DOM
document.getElementById('product-form').addEventListener('submit', (e) => {
	const { name, price, year } = e.target;
	const product = new Product(name.value, price.value, year.value);
	const ui = new UI();
	ui.addProduct(product);
	ui.resetForm(e.target);

	e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', (e) => {
	const ui = new UI();
	ui.deleteProduct(e.target);

	e.preventDefault();
});
