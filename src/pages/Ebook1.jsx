import React from "react";
import { Flex, Heading, Text, Button, Table, TableRow, TableCell, TableBody, TableHead } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

export default function Ebook1() {
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignItems="center" padding="2rem">
      <Heading level={1}>Jay Cutler Get Shredded EXTREME Edition</Heading>
      <Text fontSize="1.2rem" textAlign="center" marginTop="1rem">
        Welcome to the ultimate guide to getting shredded like Jay Cutler. Follow this plan for extreme fat loss and muscle retention.
      </Text>

      <Flex direction="column" maxWidth="800px" textAlign="left" marginTop="2rem">
        <Heading level={2}>Introduction</Heading>
        <Text>
          My best-selling Jay Cutler Get Shredded ebook just got EXTREME! Fans from around the world and readers of my #JayMail have been asking for a new program
          to get shredded with a more extreme twist. I have listened and created what will become my best-selling shredding guide for sure - the Jay Cutler Get
          Shredded EXTREME Edition!
        </Text>
        <Text>
          This is where we take things up a level to make your body melt the fat away faster. Rather than 12 weeks, we are going to do this over 16 weeks. This was actually
          the timeline I would give myself heading into the Arnold or Olympia because I felt it gives sufficient time to prime the metabolism and bring in the condition without
          having to go too low, too soon.
        </Text>

        <Heading level={2} marginTop="2rem">Extreme Fat Loss Principles</Heading>
        <Text>
          Over the next 16 weeks, we will cover the most important fat loss principles that will help you achieve the best results. You’re about to learn how I brought
          crazy condition to the stage and won 4 Mr. Olympia titles.
        </Text>

        <Heading level={3} marginTop="2rem">Training Plan</Heading>
        <Table marginTop="1rem">
          <TableHead>
            <TableRow>
              <TableCell as="th">Day</TableCell>
              <TableCell as="th">Workout</TableCell>
              <TableCell as="th">Sets</TableCell>
              <TableCell as="th">Reps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Monday</TableCell>
              <TableCell>Chest & Triceps</TableCell>
              <TableCell>4-5</TableCell>
              <TableCell>8-12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tuesday</TableCell>
              <TableCell>Back & Biceps</TableCell>
              <TableCell>4-5</TableCell>
              <TableCell>8-12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wednesday</TableCell>
              <TableCell>Rest</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Thursday</TableCell>
              <TableCell>Legs</TableCell>
              <TableCell>4-5</TableCell>
              <TableCell>8-12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Friday</TableCell>
              <TableCell>Shoulders & Abs</TableCell>
              <TableCell>4-5</TableCell>
              <TableCell>8-12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Saturday</TableCell>
              <TableCell>Arms</TableCell>
              <TableCell>4-5</TableCell>
              <TableCell>8-12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sunday</TableCell>
              <TableCell>Rest</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Heading level={2} marginTop="2rem">Diet Plan</Heading>
        <Text>
          Here is an overview of the diet plan to help you get shredded over the next 16 weeks:
        </Text>
        <Table marginTop="1rem">
          <TableHead>
            <TableRow>
              <TableCell as="th">Meal</TableCell>
              <TableCell as="th">Food</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Meal 1</TableCell>
              <TableCell>10 egg whites, 2oz oatmeal & grapefruit</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meal 2</TableCell>
              <TableCell>6oz chicken breast, 0.5 cup of white rice, green salad</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meal 3</TableCell>
              <TableCell>7oz white fish, 0.5 cup of white rice, mixed veggies</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meal 4</TableCell>
              <TableCell>6oz low fat ground turkey, 5oz white potato</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meal 5</TableCell>
              <TableCell>6oz low fat ground bison, 5oz white potato</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meal 6</TableCell>
              <TableCell>5 egg whites, 2 pieces of low-fat turkey bacon</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Heading level={2} marginTop="2rem">Cardio & Abs</Heading>
        <Text>
          Cardio plays a key role in this program. You will start with 30 minutes of fasted cardio in the morning, gradually increasing as the weeks progress.
        </Text>

        <Heading level={2} marginTop="2rem">Supplements</Heading>
        <Text>
          Recommended supplements include Total Iso Protein post-workout, SCULPT for fat loss, and Krill Oil for Omega-3 intake. Supplements should complement your
          diet, not replace it.
        </Text>

        <Heading level={2} marginTop="2rem">Conclusion</Heading>
        <Text>
          Nothing is standing in your way of amazing results now, apart from how stringent you are at sticking to the plan for the next 16 weeks. Stay disciplined and trust the
          process!
        </Text>
      </Flex>

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
