import Button from '../../src/components/Button';

describe('<Button />', () => {
  it('Should mount', () => {
    cy.mount(<Button onClick={() => null}>Click</Button>);
  });

  it('should render the button with the correct label', () => {
    cy.mount(<Button onClick={() => null}>Click</Button>);
    cy.get('button').should('have.text', 'Click');
  });

  it('should call onClick when clicked', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<Button onClick={onClickSpy}>Click</Button>);
    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.calledOnce');
  });

  it('should have correct default class', () => {
    cy.mount(<Button onClick={() => null}>Click</Button>);
    cy.get('button').should('have.class', 'px-2 py-1 h-9 transition ease-in-out delay-150 bg-emerald-500 hover:-translate-y-1 hover:scale-110 hover:bg-emerald-700 duration-300 text-green-50 outline-none');
  });

  it('should have correct background-color css', () => {
    cy.mount(<Button onClick={() => null}>Click</Button>);
    cy.get('button')
      .invoke('css', 'background-color')
      .then((backgroundColor) => {
        console.log('Background color is:', backgroundColor);
      });
    cy.get('button').should('have.css', 'background-color', 'rgb(16, 185, 129)');
  });
});
