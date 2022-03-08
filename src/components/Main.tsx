import type { Component } from 'solid-js';
import ParameterSide from './ParameterSide/ParameterSide';
import Content from './Content/Content';
import StructureSide from './StructureSide/StructureSide';
import Header from './Header/Header';

const Main: Component = () => {

  return (
    <main>

      <Header />

      <StructureSide />

      <Content />

      <ParameterSide />

    </main>
  );
};

export default Main;
