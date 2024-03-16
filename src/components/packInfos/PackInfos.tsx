export interface iPackInfos {
  title: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
}

export const PackInfos = ({ title, info1, info2, info3, info4 }: iPackInfos) => {
  return (
    <div>
      <p className='font-bold'>{title}</p>
      <p>{info1} </p>
      <p>{info2} </p>
      <p>{info3} </p>
      <p>{info4} </p>
    </div>
  );
};
