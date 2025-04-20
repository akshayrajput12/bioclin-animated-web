import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

export function BioclinScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[200px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Empowering Healthcare Through <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                Data Science Excellence
              </span>
            </h1>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470"
            alt="Medical Research"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Data Analytics"
              className="w-full h-1/2 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1470"
              alt="Healthcare Technology"
              className="w-full h-1/2 object-cover rounded-lg"
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
