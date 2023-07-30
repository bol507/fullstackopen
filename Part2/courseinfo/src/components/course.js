const Header = (props) => {
    return <h1>{props.course}</h1>
}
  
const Total = (props) => {
    const totalEx = props.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <p>Total of: {totalEx} excercises</p>
        </div>
    )
}
  
const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    )
}
  
const Content = (props) => {
    return (
      <div>
        {props.parts.map((course) =>
                <Part key={course.id} part={course.name} exercise={course.exercises}/>
            )
        }
       
      </div>
    )
  }

const Course = (props) => {
    return (
        <div>
          <Header course={props.course.name} />
          <Content parts={props.course.parts} />
          <Total parts={props.course.parts} />
          
        </div>
      )
}

export default Course