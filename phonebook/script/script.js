'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
    button: 'Редактировать',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
    button: 'Редактировать',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
    button: 'Редактировать',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
    button: 'Редактировать',
  },
];

{
  // Временная функция для добавления нового контакта
  const addContactData = contact => {
    data.push(contact);
    console.log("🚀 ~ addContactData ~ data:", data)
  };    

  const createContainer = () => {
    const container = document.createElement('div');

    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');

    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
    };

    const createFooter = title => {
    const footer = document.createElement('footer');

    footer.classList.add('footer');
    footer.textContent = `Все права защищены © ${title}`;

    return footer;
  };
    
    const createButtonGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({ className, type, text }) => {
            const button = document.createElement('button');
            button.className = className;
            button.type = type;
            button.textContent = text;

            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
            </tr>            
        `);

        const tbody = document.createElement('tbody');
        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
          <button class="close" type="button"></button>
          <h2 class="form-title">Добавить контакт</h2>
          <div class="form-group">
            <label class="form-label" for="name">Имя:</label>
            <input id="name" class="form-input" type="text" name="name" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="surname">Фамилия:</label>
            <input id="surname" class="form-input" type="text" name="surname" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="phone">Телефон:</label>
            <input id="phone" class="form-input" type="number" name="phone" required>
          </div>
        `);

        const buttonGroup = createButtonGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'submit',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger',
            type: 'reset',
            text: 'Отмена',
        },        
        ]);
        
        form.append(...buttonGroup.btns);

        overlay.append(form);

        return {
            overlay,
            form,
        };
    };

  const renderPhoneBook = (app, title) => {    
    const header = createHeader();
    const logo = createLogo(title);
      const main = createMain();
      const footer = createFooter(title);
      const buttonGroup = createButtonGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'button',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger',
            type: 'button',
            text: 'Удалить',
        },
      ]);
      
    const table = createTable();
    const { form, overlay } = createForm();

      header.headerContainer.append(logo);
      main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

      app.append(header, main, footer);
      
      return {
          list: table.tbody,
          logo,
          btnAdd: buttonGroup.btns[0],
          btnDel: buttonGroup.btns[1],
          formOverlay: overlay,
          form,
      };
    };

    const createRow = ({ name: firstName, surname, phone, button }) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;

        tdPhone.append(phoneLink);

        const btnEdit = document.createElement('td');       
        btnEdit.textContent = 'Редактировать';
        btnEdit.classList.add('btn-edit');        
        

        tr.append(tdDel, tdName, tdSurname, tdPhone, btnEdit);

        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const hoverRow = (allRow, logo) => {
      const text = logo.textContent;

      allRow.forEach(contact => {
        contact.addEventListener('mouseenter', () => {
          logo.textContent = contact.phoneLink.textContent;
        });
        contact.addEventListener('mouseleave', () => {
          logo.textContent = text;
        });
      });
  };
  
  // Функция для модального окна
  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
      const target = e.target;
        if (target === formOverlay || 
          target.classList.contains('close')) {
          closeModal();
      };          
    });
    return {
      closeModal,
    };
  };

  // Функция удаления строки контактов
  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });
        
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      };
    });
  };

  // Функция для добавления контакта
  const addContactPage = (contact, list) => {
    list.append(createRow(contact)); // добавляем новый контакт в телефонную книгу
  };
  
  // Функция для формы
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault(); // убираем перезагрузку страницы
      const formData = new FormData(e.target); // получаем данные из формы
      const newContact = Object.fromEntries(formData); // создаем объект с данными из формы
      
      addContactPage(newContact, list); // добавляем новый контакт на страницу
      addContactData(newContact); // добавляем новый контакт в базу контактов     
      form.reset(); // очищаем форму
      closeModal(); // закрываем модальное окно
    });
  };
    
  // ==== Функционал ====
    const init = (selectorApp, title) => {
      const app = document.querySelector(selectorApp);        
      const { 
        list,
        logo,
        btnAdd,
        btnDel,
        formOverlay,
        form,
      } = renderPhoneBook(app, title);
        
      const allRow = renderContacts(list, data);
      const {closeModal} = modalControl(btnAdd, formOverlay);
      
      hoverRow(allRow, logo);      
      deleteControl(btnDel, list);
      formControl(form, list, closeModal);
    };

  window.phoneBookInit = init;
}