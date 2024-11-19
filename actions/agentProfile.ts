import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface AgentProfileProps {
  profileImageUrl?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  code?: string;
  bio?: string;
  properties?: string[]; // Array of property IDs
  services?: string[];
  userId: string;
  companyId?: string;
}

// Create a new agent profile
export async function createAgentProfile(data: AgentProfileProps) {
  try {
    const { properties, ...rest } = data;

    const newProfile = await prismaClient.agentProfile.create({
      data: {
        ...rest,
        properties: properties
          ? {
              connect: properties.map((id) => ({ id })),
            }
          : undefined,
      },
    });
    revalidatePath("/dashboard/agents");

    return {
      data: newProfile,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}



// Update an existing agent profile
export async function updateAgentProfile(id: string, data: Partial<AgentProfileProps>) {
  try {
    const { properties, ...rest } = data;

    const updatedProfile = await prismaClient.agentProfile.update({
      where: { id },
      data: {
        ...rest,
        properties: properties
          ? {
              connect: properties.map((id) => ({ id })),
            }
          : undefined,
      },
    });
    revalidatePath("/dashboard/agents");

    return {
      data: updatedProfile,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}


// Get all agent profiles
export async function getAgentProfiles() {
  try {
    const profiles = await prismaClient.agentProfile.findMany({
      include: {
        user: {
          select: {
            email: true,
            lastName: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: profiles,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Get agent profile by ID
export async function getAgentProfileById(id: string) {
  try {
    const profile = await prismaClient.agentProfile.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            email: true,
            lastName: true,
            role: true,
          },
        },
      },
    });

    if (!profile) {
      return {
        data: null,
        status: 404,
        error: "Agent profile not found",
      };
    }

    return {
      data: profile,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Get agent profile by user ID
export async function getAgentProfileByUserId(userId: string) {
  try {
    const profile = await prismaClient.agentProfile.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
            lastName: true,
            role: true,
          },
        },
      },
    });

    if (!profile) {
      return {
        data: null,
        status: 404,
        error: "Agent profile not found",
      };
    }

    return {
      data: profile,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Delete an agent profile
export async function deleteAgentProfile(id: string) {
  try {
    await prismaClient.agentProfile.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/agents");

    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

// Toggle agent active status
export async function toggleAgentStatus(id: string) {
  try {
    const profile = await prismaClient.agentProfile.findUnique({
      where: {
        id,
      },
    });

    if (!profile) {
      return {
        data: null,
        status: 404,
        error: "Agent profile not found",
      };
    }

    const updatedProfile = await prismaClient.agentProfile.update({
      where: {
        id,
      },
      data: {
      },
    });
    revalidatePath("/dashboard/agents");

    return {
      data: updatedProfile,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}