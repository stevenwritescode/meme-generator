import { AriaRole, ReactNode } from "react";
import "../css/Card.css";
import { IExtendableClass, ITestable, IWrapper } from "../../common";

export interface ICard extends IWrapper {
  header?: string | ReactNode;
  footer?: string | ReactNode;
}

const Card: React.FC<ICard & IExtendableClass & ITestable> = props => {
  const { header, footer, children, className, testId } = props,
    classVar = className ? className + " card" : "card";

  return (
    <div className={classVar} data-testid={testId}>
      <CardSection className="card-header" testId="card-header" show={!!header} role="heading">
        {header}
      </CardSection>
      <CardSection className="card-body" testId="card-body" show={!!children}>
        {children}
      </CardSection>
      <CardSection className="card-footer" testId="card-footer" show={!!footer}>
        {footer}
      </CardSection>
    </div>
  );
};

interface ICardSection {
  className?: string;
  children: ReactNode;
  show: boolean;
  role?: AriaRole;
}

const CardSection: React.FC<ICardSection & IWrapper & IExtendableClass & ITestable> = props => {
  const { show, children, className, role, testId } = props;
  if (show) {
    return (
      <div className={className + " card-section"} role={role} data-testid={testId}>
        {children}
      </div>
    );
  }
  return <div />;
};

export default Card;
