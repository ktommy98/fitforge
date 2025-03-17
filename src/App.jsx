import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    client.models.Food.observeQuery().subscribe({
      next: (data) => setFoods([...data.items]),
    });
  }, []);

  async function createFood(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    await client.models.Food.create({
      name: form.get("name"),
      amount: form.get("amount"),
    });

    event.target.reset();
  }

  async function deleteFood({ id }) {
    const toBeDeletedFood = {
      id,
    };

    await client.models.Food.delete(toBeDeletedFood);
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >
          <Heading level={1}>FitForge</Heading>
          <View as="form" margin="3rem 0" onSubmit={createFood}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                name="name"
                placeholder="Food Name"
                label="Food Name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="amount"
                placeholder="Food Amount"
                label="Food Amount"
                type="float"
                labelHidden
                variation="quiet"
                required
              />

              <Button type="submit" variation="primary">
                Add
              </Button>
            </Flex>
          </View>
          <Divider />
          <Heading level={2}>Food Tracking</Heading>
          <Grid
            margin="3rem 0"
            autoFlow="column"
            justifyContent="center"
            gap="2rem"
            alignContent="center"
          >
            {foods.map((food) => (
              <Flex
                key={food.id || food.name}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="5%"
                className="box"
              >
                <View>
                  <Heading level="3">{food.name}</Heading>
                </View>
                <Text fontStyle="italic">{food.amount}</Text>

                <Button
                  variation="destructive"
                  onClick={() => deleteFood(food)}
                >
                  Remove
                </Button>
              </Flex>
            ))}
          </Grid>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Authenticator>
  );
}
