import { StepCardProps } from "../../Data/Models/Home.model";
import "./StepCard.scss"

const StepCard: React.FC<StepCardProps> = ({ icon, title }) => (
  <div className="step-card">
    <div className="icon">
      <i className={`bx ${icon}`}></i>
    </div>
    <h3 className="title">{title}</h3>
  </div>
);

export default StepCard;