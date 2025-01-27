import Input from '../../src/components/Input';

describe('<Input />', () => {
  it('Should mount', () => {
    cy.mount(<Input />);
  });

  it('Should have valid label', () => {
    cy.mount(<Input label="name" />);
    cy.get('label').should('have.text', 'name');
  });

  it('Should have valid value', () => {
    cy.mount(<Input label="name" value="some value" />);
    cy.get('input').should('have.value', 'some value');
  });

  it('Should update the input value on change', () => {
    let value = '';
    cy.mount(<Input label="name" value={value} />);
    cy.get('input').should('have.value', '');
    value = 'Hello';
    cy.mount(<Input label="name" value={value} />);
    cy.get('input').should('have.value', 'Hello');
  });

  it('onChange should be called', () => {
    const onChange = cy.spy().as('onChangeSpy');
    cy.mount(<Input label="name" onChange={onChange} />);
    cy.get('input').type(' World');
    cy.get('@onChangeSpy').should('have.been.called');
  });
});
