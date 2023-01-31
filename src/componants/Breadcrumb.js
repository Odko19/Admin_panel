import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { HomeOutlined} from '@ant-design/icons';

const Breadcrumbs = ()  => {
    const location = useLocation();
    const breadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);
        const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  
  return (
    <div>
        <Breadcrumb>
        {pathnames.length > 0 ? (
        <Breadcrumb.Item> <HomeOutlined style={{color: "#4E89FF"}}/>
        <Link to="/">Home</Link>
         </Breadcrumb.Item>
         ):(<Breadcrumb.Item> <HomeOutlined style={{color: "#4E89FF"}}/>    Home</Breadcrumb.Item>)}
         {pathnames.map((name, index) => {
            
            const routeTo = `/${pathnames.slice   (0, index +1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
                <Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
            ):(
                <Breadcrumb.Item key={index}>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link></Breadcrumb.Item>
            )
         })}
        </Breadcrumb>
    </div>
  );
}; return <>{breadCrumbView()}</>;
}

export default Breadcrumbs