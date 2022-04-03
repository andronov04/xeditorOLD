import type { Component } from 'solid-js';
import ParameterSide from './ParameterSide/ParameterSide';
import Content from './Content/Content';
import StructureSide from './StructureSide/StructureSide';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Main: Component = () => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <Header />
      <main className={'relative flex-grow w-full'}>
        <StructureSide />

        <Content />

        <ParameterSide />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
