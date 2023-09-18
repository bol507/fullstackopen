describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    // ...
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('bdelgado')
      cy.get('#password').type('sanchez')
      cy.contains('login').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.contains('invalid username or password')
    })
  })

  describe('Blogs', function () {

    it('User can create a new blog after logging in', function () {
      cy.get('#username').type('bdelgado')
      cy.get('#password').type('sanchez')
      cy.contains('login').click()


      // Ir al formulario de creación de blogs
      cy.contains('New Blog').click()

      // Rellenar el formulario de creación de blogs
      cy.get('input[name="titleInput"]').type('Title of blog')
      cy.get('input[name="authorInput"]').type('Author of blog')
      cy.contains('Create Blog').click()


      cy.contains('Title of blog')
      cy.contains('Author of blog')
    })

    it('User can like a blog', function () {
      cy.get('#username').type('bdelgado')
      cy.get('#password').type('sanchez')
      cy.contains('login').click()

      cy.contains('Title of blog')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
      cy.contains('like').click()
      cy.contains('2')
    })

    it('User can delete their own blog', function () {
      cy.get('#username').type('bdelgado')
      cy.get('#password').type('sanchez')
      cy.contains('login').click()

      cy.contains('Title of blog')
      cy.contains('view').click()
      cy.contains('Delete').click()
      cy.contains('Title of blog').should('not.exist')
    })

    it('Other users cannot delete a blog', function () {
      cy.get('#username').type('delgado')
      cy.get('#password').type('h05t1l3')
      cy.contains('login').click()

      cy.contains('New Blog').click()

      cy.get('input[name="titleInput"]').type('Course of fullstack')
      cy.get('input[name="authorInput"]').type('mluukkai salainen ')
      cy.contains('Create Blog').click()


      cy.contains('Sign out').click()

      cy.get('#username').type('bdelgado')
      cy.get('#password').type('sanchez')
      cy.contains('login').click()

      cy.contains('Course of fullstack')
      cy.contains('view').click()
      cy.contains('delete').should('not.exist')

    })

    it('Blogs are sorted by likes', function () {
      cy.get('#username').type('bdelgado')
      cy.get('#password').type('sanchez')
      cy.contains('login').click()

      cy.contains('New Blog').click()
      cy.get('input[name="titleInput"]').type('Fullstack open2023')
      cy.get('input[name="authorInput"]').type('mluukkai')
      cy.get('input[name="urlInput"]').type('https://fullstackopen.com/')
      cy.contains('Create Blog').click()

      cy.contains('Fullstack open2023')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()
      
      cy.contains('New Blog').click()
      cy.get('input[name="titleInput"]').type('React')
      cy.get('input[name="authorInput"]').type('mluukkai')
      cy.get('input[name="urlInput"]').type('https://fullstackopen.com/')
      cy.contains('Create Blog').click()

      cy.contains('Sign out').click()
      cy.get('#username').type('delgado')
      cy.get('#password').type('h05t1l3')
      cy.contains('login').click()


      cy.get('.blog').eq(0).should('contain', 'React')
      cy.get('.blog').eq(1).should('contain', 'Fullstack open2023')
    })

  })

})