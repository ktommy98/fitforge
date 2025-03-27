import React from "react";
import { Flex, Heading, Text, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

export default function Ebook2() {
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignItems="center" padding="2rem">
      <Heading level={1}>Jay Cutler’s Mass-Ter Plan</Heading>
      <Text fontSize="1.2rem" textAlign="center" marginTop="1rem">
        This is the ultimate mass-building guide, designed to help you gain serious muscle with structured training and nutrition principles.
      </Text>

      <Text fontSize="1rem" textAlign="left" marginTop="1rem" maxWidth="800px">
        This program is designed to maximize muscle hypertrophy through a combination of heavy compound lifts, controlled reps, and high training volume. 
        Below you’ll find the structured weekly workout plan with exercises, sets, reps, and rest times. Stick to progressive overload and ensure proper recovery.
      </Text>

      <Heading level={2} marginTop="2rem">Workout Plan</Heading>
      <Table variation="striped" marginTop="1rem">
        <TableHead>
          <TableRow>
            <TableCell as="th">Day</TableCell>
            <TableCell as="th">Workout</TableCell>
            <TableCell as="th">Key Exercises</TableCell>
            <TableCell as="th">Sets x Reps</TableCell>
            <TableCell as="th">Rest Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Monday</TableCell>
            <TableCell>Chest & Triceps</TableCell>
            <TableCell>Bench Press, Incline Dumbbell Press, Dips, Skull Crushers</TableCell>
            <TableCell>4 x 6-10</TableCell>
            <TableCell>60-90 sec</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tuesday</TableCell>
            <TableCell>Back & Biceps</TableCell>
            <TableCell>Pull-Ups, Barbell Rows, Lat Pulldown, Hammer Curls</TableCell>
            <TableCell>4 x 8-12</TableCell>
            <TableCell>60-90 sec</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wednesday</TableCell>
            <TableCell>Legs</TableCell>
            <TableCell>Squats, Leg Press, Romanian Deadlifts, Calf Raises</TableCell>
            <TableCell>5 x 8-10</TableCell>
            <TableCell>90-120 sec</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Thursday</TableCell>
            <TableCell>Shoulders & Abs</TableCell>
            <TableCell>Overhead Press, Lateral Raises, Hanging Leg Raises</TableCell>
            <TableCell>4 x 10-12</TableCell>
            <TableCell>45-60 sec</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Friday</TableCell>
            <TableCell>Arms</TableCell>
            <TableCell>Close-Grip Bench Press, Preacher Curls, Rope Pushdowns</TableCell>
            <TableCell>4 x 8-12</TableCell>
            <TableCell>45-60 sec</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Saturday</TableCell>
            <TableCell>Legs & Core</TableCell>
            <TableCell>Front Squats, Deadlifts, Hanging Leg Raises, Planks</TableCell>
            <TableCell>5 x 8-10</TableCell>
            <TableCell>90-120 sec</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sunday</TableCell>
            <TableCell>Rest</TableCell>
            <TableCell>Active Recovery / Stretching</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Heading level={2} marginTop="2rem">Advanced Training Techniques</Heading>
      <Text fontSize="1rem" textAlign="left" marginTop="1rem" maxWidth="800px">
        - **Drop Sets:** Reduce the weight by 20-30% after failure and continue for additional reps. Great for hypertrophy.  
        - **Rest-Pause:** Perform a set to failure, rest for 10-15 seconds, then complete a few more reps.  
        - **Super Sets:** Pair two exercises targeting opposite muscles (e.g., biceps and triceps) with no rest between them.  
        - **Slow Negatives:** Extend the eccentric (lowering) phase to 3-5 seconds to increase time under tension.  
        - **Partial Reps:** After failure, perform shorter range-of-motion reps to squeeze out extra intensity.  
      </Text>

      <Heading level={2} marginTop="2rem">Progressive Overload Strategies</Heading>
      <Text fontSize="1rem" textAlign="left" marginTop="1rem" maxWidth="800px">
        - **Increase Weight:** Aim to add **2.5-5% more weight** each week while maintaining form.  
        - **More Reps:** If you hit the upper rep range (e.g., 10 reps in a 6-10 rep range), increase the weight next session.  
        - **Shorter Rest Periods:** Reduce rest time slightly to improve muscular endurance and intensity.  
        - **Higher Training Volume:** Add extra sets gradually to increase overall workload.  
        - **Better Mind-Muscle Connection:** Focus on strict form and controlled reps to maximize muscle activation.  
      </Text>

      <Heading level={2} marginTop="2rem">Nutrition & Recovery</Heading>
      <Text fontSize="1rem" textAlign="left" marginTop="1rem" maxWidth="800px">
        - **Caloric Surplus:** Ensure you consume 250-500 extra calories per day to promote muscle growth.  
        - **Macronutrient Split:** Aim for 40% protein, 40% carbohydrates, and 20% healthy fats.  
        - **Protein Intake:** Consume at least **1g of protein per pound of body weight** daily.  
        - **Hydration:** Drink at least **1 gallon of water per day** to optimize muscle recovery.  
        - **Sleep:** Target **7-9 hours of sleep per night** for optimal growth and hormone regulation.  
      </Text>

      <Button
              onClick={() => navigate("/workoutplan")}
              variation="primary"
              style={{
                  marginTop: "2rem",
                  backgroundColor: "#7D0A0A",
                  color: "white",
                  transition: "background 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#BF3131")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
              >
              Back to Workout Plan
              </Button>
    </Flex>
  );
}
