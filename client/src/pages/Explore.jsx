import React from 'react';
import ResourceCard from '../components/ResourceCard';
import '../styles/Resource.css';


const Resources = () =>{
    return (
        <section id="resources">
            <h2>Resources for Parents</h2>
            <ResourceCard
                title="Understanding Autism"
                description="Learn about autism spectrum disorder and how it affects children."
                link="https://www.autismspeaks.org"
          />
                  <ResourceCard
                title="The Autism Society"
                description=" Find information on understanding autism, advocacy, and local support networks."
                link="https://autismsociety.org/"
          />
           <ResourceCard
                title="Understanding Autism"
                description="Learn about autism spectrum disorder and how it affects children."
                link="https://www.autismspeaks.org"
          />
          <ResourceCard
          title= "Parenting Tips"
          description= "Emotional Regulation Tips: Breathing Excercises, simple deep-breathing techniques "
          />
          </section>
    
    );
};

export default Resources;